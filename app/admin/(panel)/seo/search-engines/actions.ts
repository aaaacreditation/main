"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { audit, bool, requireArea, str } from "@/lib/admin";
import {
  normalizeSeoSettings,
  parseRobotsDisallow,
  readSeoSettingsFresh,
  verificationToken,
  writeSeoSettings,
  type SeoSettings,
} from "@/lib/site-settings";
import { refreshSitemaps, submitIndexNow } from "@/lib/search-engines";
import { sitemapEntries } from "@/lib/sitemap";

/* SEO Center → Search engines & AI (Nov 2026): site-wide SEO settings and
 * manual IndexNow submissions. Settings are read through lib/site-settings.ts
 * (tag "site-settings"). */

const HERE = "/admin/seo/search-engines";

const randomKey = () => crypto.randomUUID().replace(/-/g, "");

export async function saveSearchSettings(formData: FormData) {
  const session = await requireArea("seo");
  const { settings: before } = await readSeoSettingsFresh();

  const next: SeoSettings = normalizeSeoSettings({
    googleVerification: verificationToken(str(formData, "googleVerification", 600)),
    bingVerification: verificationToken(str(formData, "bingVerification", 600)),
    yandexVerification: verificationToken(str(formData, "yandexVerification", 600)),
    aiSearch: str(formData, "aiSearch", 10) === "block" ? "block" : "allow",
    aiTraining: str(formData, "aiTraining", 10) === "block" ? "block" : "allow",
    robotsDisallow: parseRobotsDisallow(str(formData, "robotsDisallow", 4000)),
    indexNow: bool(formData, "indexNow"),
    indexNowKey: bool(formData, "newKey") ? randomKey() : before.indexNowKey,
    tagMinPosts: Number.parseInt(str(formData, "tagMinPosts", 4), 10),
    llmsIntro: str(formData, "llmsIntro", 4000),
  });

  await writeSeoSettings(next);

  const changed = (Object.keys(next) as (keyof SeoSettings)[]).filter(
    (k) => JSON.stringify(next[k]) !== JSON.stringify(before[k]),
  );
  await audit(session.user.id, "update", "seo", "settings", `Search engines & AI settings: ${changed.join(", ") || "no changes"}`);

  updateTag("site-settings");
  refreshSitemaps();
  revalidatePath("/"); // verification tags live on the home page
  if (changed.includes("tagMinPosts")) revalidatePath("/news", "layout"); // tag pages' noindex
  redirect(`${HERE}?saved=1`);
}

export async function submitToIndexNow(formData: FormData) {
  const session = await requireArea("seo");
  const all = str(formData, "scope", 10) === "all";
  const list = all
    ? (await sitemapEntries()).map((e) => e.url)
    : str(formData, "urls", 20_000)
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

  const result = await submitIndexNow(list, { source: "manual", force: true });
  await audit(
    session.user.id,
    "update",
    "seo",
    "indexnow",
    `IndexNow: ${all ? "all sitemap URLs" : `${list.length} URL(s)`} — ${result.message}`,
  );
  const q = new URLSearchParams({ submitted: result.message, ok: result.ok ? "1" : "0" });
  redirect(`${HERE}?${q.toString()}#indexnow`);
}

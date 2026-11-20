import NextLink from "next/link";
import type { ComponentProps } from "react";
import { publicPath } from "@/lib/public-urls";

/**
 * `next/link` for the public site: internal hrefs are written as route paths
 * ("/about", "/news/<slug>", "/programs/healthcare/standards") and rendered as
 * their public addresses ("/about-aaa/", "/<slug>/", "/healthcare-accreditation/
 * accreditation-standards/") — the old WordPress URLs the client asked to keep
 * as the real links (Nov 2026). See lib/public-urls.ts.
 *
 * Works in server and client components (no hooks, no state).
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const mapped =
    typeof href === "string"
      ? publicPath(href)
      : href && typeof href === "object" && typeof href.pathname === "string"
        ? { ...href, pathname: publicPath(href.pathname) }
        : href;
  return <NextLink href={mapped} {...rest} />;
}

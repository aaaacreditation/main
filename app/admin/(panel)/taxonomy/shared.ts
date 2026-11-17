import { TermKind } from "@prisma/client";

/** The three lists on Admin → Categories & Tags. */
export type TaxonomyTab = "categories" | "tags" | "register";

export const TAB_KIND: Record<TaxonomyTab, TermKind> = {
  categories: TermKind.POST_CATEGORY,
  tags: TermKind.POST_TAG,
  register: TermKind.ORG_TAG,
};

const LABELS: Record<TermKind, { tab: TaxonomyTab; title: string; one: string }> = {
  POST_CATEGORY: { tab: "categories", title: "Blog & news categories", one: "category" },
  POST_TAG: { tab: "tags", title: "Blog & news tags", one: "tag" },
  ORG_TAG: { tab: "register", title: "Register tags", one: "register tag" },
};

export const kindTab = (kind: TermKind) => LABELS[kind];

export const TAXONOMY_ERRORS: Record<string, string> = {
  name: "Give it a name (letters or numbers).",
  exists: "That name is already in this list.",
  builtin: "That name is one of the register’s built-in “Accredited as” types, which are always listed.",
  move: "Choose the category its articles should move to.",
  notfound: "That item no longer exists — it may have been deleted.",
};

export const TAXONOMY_SAVED: Record<string, string> = {
  created: "Added.",
  updated: "Saved. Articles and organizations using it were updated.",
  deleted: "Deleted.",
};

-- Case study page builder (Nov 2026). Additive: existing case studies keep a
-- NULL layout and render from "body" as before.
ALTER TABLE "CaseStudy" ADD COLUMN "layout" JSONB;

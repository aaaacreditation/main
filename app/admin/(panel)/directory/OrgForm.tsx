import Link from "next/link";
import {
  ACCREDITATION_TYPES,
  REGISTER_TYPES,
  accreditationType,
  countryArt,
} from "@/app/_data/accredited-organizations";
import ImageField from "../../_components/ImageField";
import SubmitButton from "../../_components/SubmitButton";
import AccreditationsRepeater, { type RecordInput } from "./AccreditationsRepeater";
import DeleteOrgButton from "./DeleteOrgButton";
import { deleteOrganization, saveOrganization } from "./actions";

export type OrgFormData = {
  id?: string;
  slug?: string;
  name?: string;
  location?: string;
  country?: string;
  description?: string;
  logo?: string | null;
  flag?: string | null;
  website?: string | null;
  order?: number;
  status?: "PUBLISHED" | "DRAFT";
  tags?: string[];
  accreditations?: RecordInput[];
};

export const ORG_FORM_ERRORS: Record<string, string> = {
  name: "Give the organization a name.",
  country: "Choose the organization’s country — the public register filters by it.",
  logo: "The logo must be an uploaded image or a path on this site (or aaa-accreditation.org).",
  flag: "The country flag must be an uploaded image or a path on this site (or aaa-accreditation.org).",
  website: "The website isn’t a valid web address.",
  records: "The accreditation records couldn’t be read. Reload the page and try again.",
  accreditedAs: "Every accreditation record needs an “Accredited as” value.",
  "too-many": "An organization can hold at most 30 accreditation records.",
  "no-records": "A published organization needs at least one accreditation record — add one, or save it as a draft.",
};

/**
 * Editor for one register entry: the organization (main column), its
 * accreditation records (repeater) and publishing settings (side column).
 */
export default function OrgForm({
  org,
  countries,
  accreditedAsOptions,
  customTags = [],
}: {
  org?: OrgFormData;
  countries: string[];
  accreditedAsOptions: string[];
  /** Register tags from Admin → Categories & Tags. */
  customTags?: { slug: string; name: string }[];
}) {
  const editing = Boolean(org?.id);
  const builtInFlag = !org?.flag && org?.country ? countryArt(org.country) : undefined;
  // Types the saved records already put the organization under (no tick needed for these).
  const recordTypes = Array.from(
    new Set((org?.accreditations ?? []).map((a) => accreditationType(a)).filter((t) => t !== "other"))
  ).map((t) => ACCREDITATION_TYPES[t].label);

  return (
    <form action={saveOrganization} className="adm-form">
      {editing ? <input type="hidden" name="id" value={org!.id} /> : null}

      <div className="adm-form-grid">
        <div className="adm-form-main">
          <h3 className="adm-section-title">Organization</h3>
          <label className="adm-label" htmlFor="of-name">
            Name *
          </label>
          <input
            id="of-name"
            className="sme-input adm-title-input"
            name="name"
            required
            maxLength={300}
            defaultValue={org?.name ?? ""}
            placeholder="The organization’s own name"
          />

          <div className="adm-fields">
            <div>
              <label className="adm-label" htmlFor="of-location">
                Location
              </label>
              <input
                id="of-location"
                className="sme-input"
                name="location"
                maxLength={200}
                defaultValue={org?.location ?? ""}
                placeholder="City, Country — e.g. Doha, Qatar"
              />
            </div>
            <div>
              <label className="adm-label" htmlFor="of-country">
                Country *
              </label>
              <input
                id="of-country"
                className="sme-input"
                name="country"
                list="of-countries"
                required
                maxLength={120}
                defaultValue={org?.country ?? ""}
                placeholder="e.g. United Arab Emirates"
                autoComplete="off"
              />
              <datalist id="of-countries">
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
          <p className="adm-hint">
            Pick an existing country spelling where one fits, so the register’s country filter groups the
            entry correctly.
          </p>

          <label className="adm-label" htmlFor="of-description">
            Description
          </label>
          <textarea
            id="of-description"
            className="sme-textarea"
            name="description"
            rows={6}
            maxLength={8000}
            defaultValue={org?.description ?? ""}
          />
          <p className="adm-hint">
            The organization’s own wording, published as supplied. Don’t edit facts in it — including any
            country or client counts — to match AAA’s figures.
          </p>

          <label className="adm-label" htmlFor="of-website">
            Website
          </label>
          <input
            id="of-website"
            className="sme-input"
            name="website"
            inputMode="url"
            maxLength={500}
            defaultValue={org?.website ?? ""}
            placeholder="https://"
          />

          <h3 className="adm-section-title">Accredited as tags</h3>
          <p className="adm-hint" style={{ marginTop: 4 }}>
            Tick every type this organization should appear under in the public register’s “Accredited as”
            filter — it shows under each one. It is also listed automatically under the types its records name
            {recordTypes.length > 0 ? <> ({recordTypes.join(", ")})</> : null}, so those don’t need a tick.
          </p>
          <div className="dir-tags">
            {REGISTER_TYPES.map((t) => {
              const { label, standard } = ACCREDITATION_TYPES[t];
              return (
                <label className="dir-tag" key={t}>
                  <input type="checkbox" name="tags" value={t} defaultChecked={org?.tags?.includes(t) ?? false} />
                  <span>
                    {label}
                    {standard ? <small>{standard}</small> : null}
                  </span>
                </label>
              );
            })}
            {customTags.map((t) => (
              <label className="dir-tag custom" key={t.slug}>
                <input type="checkbox" name="tags" value={t.slug} defaultChecked={org?.tags?.includes(t.slug) ?? false} />
                <span>
                  {t.name}
                  <small>Custom tag</small>
                </span>
              </label>
            ))}
          </div>
          <label className="adm-label" htmlFor="of-newtags">
            Add new tags
          </label>
          <input
            id="of-newtags"
            className="sme-input"
            name="newTags"
            maxLength={300}
            placeholder="e.g. ISO 45001 Training, Online Academy — separate with commas"
          />
          <p className="adm-hint">
            New tags are ticked for this organization and become filters on the public register.{" "}
            <Link href="/admin/taxonomy?tab=register">Manage register tags</Link>
          </p>

          <h3 className="adm-section-title">Accreditation records</h3>
          <p className="adm-hint" style={{ marginTop: 4 }}>
            One row per accreditation, in the order the register shows them. Every field is published as
            typed; the status is shown exactly as set here — it is never inferred from the expiry date.
          </p>
          <AccreditationsRepeater initial={org?.accreditations ?? []} accreditedAsOptions={accreditedAsOptions} />
        </div>

        <aside className="adm-form-side">
          <div className="adm-panel">
            <h3>Publish</h3>
            <label className="adm-label" htmlFor="of-status">
              Listing
            </label>
            <select id="of-status" className="sme-select" name="status" defaultValue={org?.status ?? "PUBLISHED"}>
              <option value="PUBLISHED">Published — on the public register</option>
              <option value="DRAFT">Draft — hidden from the register</option>
            </select>
            <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Saving…">
              {editing ? "Save changes" : "Add organization"}
            </SubmitButton>
            {editing && org?.status === "PUBLISHED" ? (
              <Link href="/directory/accredited-organizations#register" target="_blank" className="adm-panel-link">
                View the public register ↗
              </Link>
            ) : null}
          </div>

          <div className="adm-panel">
            <h3>Logo</h3>
            <ImageField name="logo" label="" initial={org?.logo ?? ""} />
            <p className="adm-hint">Shown on the register card. Use a transparent PNG, WebP or SVG.</p>
          </div>

          <div className="adm-panel">
            <h3>Country flag</h3>
            <ImageField name="flag" label="" initial={org?.flag ?? ""} />
            {builtInFlag ? (
              <div className="dir-flag-builtin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={builtInFlag} alt="" />
                <p className="adm-hint">
                  Using the built-in {org?.country} artwork. Upload an image only to replace it.
                </p>
              </div>
            ) : null}
            <p className="adm-hint">
              Shown behind the description when a visitor hovers the register card. Leave it empty to use the
              built-in artwork for the country (available for every country already on the register); upload one
              for a new country. A portrait image around 800 × 960 px works best.
            </p>
          </div>

          <div className="adm-panel">
            <h3>Register placement</h3>
            {editing ? (
              <>
                <label className="adm-label" htmlFor="of-order">
                  Register order
                </label>
                <input
                  id="of-order"
                  className="sme-input"
                  name="order"
                  type="number"
                  step={1}
                  defaultValue={org?.order ?? 0}
                />
                <p className="adm-hint">Lower numbers come first. New organizations are added at the top.</p>
              </>
            ) : (
              <p className="adm-hint" style={{ marginTop: 6 }}>
                New organizations are added at the top of the register.
              </p>
            )}
            <label className="adm-label" htmlFor="of-slug">
              Slug
            </label>
            <input
              id="of-slug"
              className="sme-input"
              name="slug"
              maxLength={120}
              defaultValue={org?.slug ?? ""}
              placeholder="auto-generated from name and country"
            />
          </div>

          {editing ? (
            <div className="adm-panel">
              <h3>Remove from the register</h3>
              <p className="adm-hint" style={{ marginBottom: 12 }}>
                Deletes the organization and all of its accreditation records. To hide it temporarily, set it to
                Draft instead.
              </p>
              <DeleteOrgButton
                action={deleteOrganization}
                confirmText={`Delete “${org?.name ?? "this organization"}” and its accreditation records? This cannot be undone.`}
              >
                Delete organization
              </DeleteOrgButton>
            </div>
          ) : null}
        </aside>
      </div>
    </form>
  );
}

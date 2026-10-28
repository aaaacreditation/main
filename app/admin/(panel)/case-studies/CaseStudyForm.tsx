"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageField from "../../_components/ImageField";
import SubmitButton from "../../_components/SubmitButton";
import { saveCaseStudy } from "./actions";
import { CASE_STUDY_ERRORS, IMAGE_POSITIONS } from "./shared";

export interface CaseStudyFormData {
  id?: string;
  slug?: string;
  name?: string;
  sector?: string;
  country?: string;
  metric?: string;
  quote?: string;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  imagePosition?: string;
  logo?: string | null;
  logoTight?: boolean;
  initials?: string;
  videoUrl?: string | null;
  link?: string | null;
  featured?: boolean;
  showOnHome?: boolean;
  showOnSme?: boolean;
  order?: number | null;
  status?: string;
}

type Preview = {
  name: string;
  sector: string;
  country: string;
  metric: string;
  quote: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  logo: string;
  logoTight: boolean;
  initials: string;
  videoUrl: string;
  featured: boolean;
  showOnHome: boolean;
  showOnSme: boolean;
};

function fromData(cs?: CaseStudyFormData): Preview {
  return {
    name: cs?.name ?? "",
    sector: cs?.sector ?? "",
    country: cs?.country ?? "",
    metric: cs?.metric ?? "",
    quote: cs?.quote ?? "",
    image: cs?.image ?? "",
    imageAlt: cs?.imageAlt ?? "",
    imagePosition: cs?.imagePosition ?? "",
    logo: cs?.logo ?? "",
    logoTight: Boolean(cs?.logoTight),
    initials: cs?.initials ?? "",
    videoUrl: cs?.videoUrl ?? "",
    featured: Boolean(cs?.featured),
    showOnHome: Boolean(cs?.showOnHome),
    showOnSme: Boolean(cs?.showOnSme),
  };
}

function readForm(form: HTMLFormElement): Preview {
  const fd = new FormData(form);
  const s = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    name: s("name"),
    sector: s("sector"),
    country: s("country"),
    metric: s("metric"),
    quote: s("quote"),
    image: s("image"),
    imageAlt: s("imageAlt"),
    imagePosition: s("imagePosition"),
    logo: s("logo"),
    logoTight: fd.has("logoTight"),
    initials: s("initials"),
    videoUrl: s("videoUrl"),
    featured: fd.has("featured"),
    showOnHome: fd.has("showOnHome"),
    showOnSme: fd.has("showOnSme"),
  };
}

/** Case study editor: fields on the left, publishing + placement + a live card preview on the right. */
export default function CaseStudyForm({ cs }: { cs?: CaseStudyFormData }) {
  const editing = Boolean(cs?.id);
  const formRef = useRef<HTMLFormElement>(null);
  const [pv, setPv] = useState<Preview>(() => fromData(cs));
  const [clientError, setClientError] = useState("");

  const sync = useCallback(() => {
    if (formRef.current) setPv(readForm(formRef.current));
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    // ImageField sets its hidden input programmatically after an upload, which
    // fires no input event — watch the value attribute so the preview follows.
    const observer = new MutationObserver(sync);
    observer.observe(form, { subtree: true, attributes: true, attributeFilter: ["value"] });
    return () => observer.disconnect();
  }, [sync]);

  // Same placement rules as the server action, checked here first so a
  // missing photo doesn't cost the editor everything they typed.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const p = readForm(e.currentTarget);
    let msg = "";
    if (p.showOnHome && (!p.image || !p.imageAlt || !p.logo)) msg = CASE_STUDY_ERRORS["home-media"];
    else if (p.showOnSme && !p.image) msg = CASE_STUDY_ERRORS["sme-image"];
    setClientError(msg);
    if (msg) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const positions = IMAGE_POSITIONS.some((p) => p.value === (cs?.imagePosition ?? ""))
    ? IMAGE_POSITIONS
    : [...IMAGE_POSITIONS, { value: cs!.imagePosition!, label: `${cs!.imagePosition} (current)` }];

  const initials = pv.initials || pv.name.slice(0, 2).toUpperCase();

  return (
    <form ref={formRef} action={saveCaseStudy} onChange={sync} onSubmit={onSubmit} className="adm-form cs-form">
      {editing ? <input type="hidden" name="id" value={cs!.id} /> : null}
      {clientError ? <p className="adm-error" role="alert">{clientError}</p> : null}

      <div className="adm-form-grid">
        <div className="adm-form-main">
          <h3 className="adm-section-title">Organization</h3>
          <label className="adm-label" htmlFor="cs-name">Organization name *</label>
          <input
            id="cs-name"
            className="sme-input adm-title-input"
            name="name"
            required
            maxLength={200}
            defaultValue={cs?.name ?? ""}
            placeholder="e.g. Monarch Master Injector"
          />
          <div className="adm-fields">
            <div>
              <label className="adm-label" htmlFor="cs-sector">Sector</label>
              <input id="cs-sector" className="sme-input" name="sector" maxLength={120} defaultValue={cs?.sector ?? ""} placeholder="e.g. Healthcare" />
            </div>
            <div>
              <label className="adm-label" htmlFor="cs-country">Country / location</label>
              <input id="cs-country" className="sme-input" name="country" maxLength={160} defaultValue={cs?.country ?? ""} placeholder="e.g. USA" />
            </div>
          </div>

          <h3 className="adm-section-title">Story</h3>
          <label className="adm-label" htmlFor="cs-quote">Testimonial</label>
          <textarea
            id="cs-quote"
            className="sme-textarea"
            name="quote"
            rows={4}
            maxLength={2000}
            defaultValue={cs?.quote ?? ""}
            placeholder="The organization’s own words, without quote marks"
          />
          <p className="adm-hint">
            Testimonials are verbatim: paste the organization’s words exactly as supplied, without
            rewording. The card adds the quote marks.
          </p>

          <label className="adm-label" htmlFor="cs-metric">Metric</label>
          <input
            id="cs-metric"
            className="sme-input"
            name="metric"
            maxLength={200}
            defaultValue={cs?.metric ?? ""}
            placeholder="e.g. 12% Growth · 500+ Students Certified"
          />
          <p className="adm-hint">Short gold kicker shown above the organization name.</p>

          <label className="adm-label" htmlFor="cs-desc">Impact detail</label>
          <textarea
            id="cs-desc"
            className="sme-textarea"
            name="description"
            rows={3}
            maxLength={3000}
            defaultValue={cs?.description ?? ""}
            placeholder="Optional extra figures, shown under the quote on the SME page"
          />

          <div className="adm-fields">
            <div>
              <label className="adm-label" htmlFor="cs-video">Video URL (YouTube)</label>
              <input
                id="cs-video"
                className="sme-input"
                name="videoUrl"
                type="url"
                inputMode="url"
                maxLength={500}
                defaultValue={cs?.videoUrl ?? ""}
                placeholder="https://www.youtube.com/watch?v=…"
              />
              <p className="adm-hint">
                With a video, the home card shows a play button and “Watch Video”. Use the video
                thumbnail as the photo.
              </p>
            </div>
            <div>
              <label className="adm-label" htmlFor="cs-link">Story link</label>
              <input
                id="cs-link"
                className="sme-input"
                name="link"
                inputMode="url"
                maxLength={500}
                defaultValue={cs?.link ?? ""}
                placeholder="https://… or /news/…"
              />
              <p className="adm-hint">“Read Story” target. Blank uses the all-success-stories page.</p>
            </div>
          </div>

          <h3 className="adm-section-title">Photo</h3>
          <ImageField name="image" label="Certificate photo or video thumbnail" initial={cs?.image ?? ""} />
          <div className="adm-fields">
            <div>
              <label className="adm-label" htmlFor="cs-alt">Photo alt text</label>
              <input
                id="cs-alt"
                className="sme-input"
                name="imageAlt"
                maxLength={300}
                defaultValue={cs?.imageAlt ?? ""}
                placeholder="Describe the photo for screen readers"
              />
            </div>
            <div>
              <label className="adm-label" htmlFor="cs-pos">Photo crop</label>
              <select id="cs-pos" className="sme-select" name="imagePosition" defaultValue={cs?.imagePosition ?? ""}>
                {positions.map((p) => (
                  <option key={p.value || "center"} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="adm-hint">
            The card crops the photo to a wide frame. For portrait shots, “Center 25%” or “Center 35%”
            keeps faces and certificates in view. Check the preview.
          </p>

          <h3 className="adm-section-title">Logo</h3>
          <ImageField name="logo" label="Organization logo" initial={cs?.logo ?? ""} />
          <label className="adm-check">
            <input type="checkbox" name="logoTight" defaultChecked={Boolean(cs?.logoTight)} />
            <span>
              Tight logo plate
              <small>Near-zero padding, for round or very wide logos that otherwise look small.</small>
            </span>
          </label>
          <label className="adm-label" htmlFor="cs-initials">Initials</label>
          <input
            id="cs-initials"
            className="sme-input cs-initials-input"
            name="initials"
            maxLength={6}
            defaultValue={cs?.initials ?? ""}
            placeholder="e.g. MM"
          />
          <p className="adm-hint">Fallback where a surface shows an avatar instead of the logo.</p>
        </div>

        <aside className="adm-form-side">
          <div className="adm-panel">
            <h3>Publish</h3>
            <label className="adm-label" htmlFor="cs-status">Status</label>
            <select id="cs-status" className="sme-select" name="status" defaultValue={cs?.status ?? "PUBLISHED"}>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
            <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Saving…">
              {editing ? "Save changes" : "Create case study"}
            </SubmitButton>
            {editing && cs?.status === "PUBLISHED" ? (
              <>
                {cs.showOnHome ? (
                  <a href="/#success-stories" target="_blank" rel="noopener noreferrer" className="adm-panel-link">
                    View home page ↗
                  </a>
                ) : null}
                {cs.showOnSme ? (
                  <a href="/programs/smes-accreditation-program" target="_blank" rel="noopener noreferrer" className="adm-panel-link cs-panel-link">
                    View SME page ↗
                  </a>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="adm-panel">
            <h3>Placement</h3>
            <label className="adm-check">
              <input type="checkbox" name="showOnHome" defaultChecked={Boolean(cs?.showOnHome)} />
              <span>
                Home carousel
                <small>Needs a photo, its alt text and a logo.</small>
              </span>
            </label>
            <label className="adm-check">
              <input type="checkbox" name="showOnSme" defaultChecked={Boolean(cs?.showOnSme)} />
              <span>
                SME page
                <small>The SME Accreditation page story marquee. Needs a photo.</small>
              </span>
            </label>
            <label className="adm-check">
              <input type="checkbox" name="featured" defaultChecked={Boolean(cs?.featured)} />
              <span>
                Featured
                <small>Wider home card with a gold “Featured Story” tag.</small>
              </span>
            </label>
            <label className="adm-label" htmlFor="cs-order">Order</label>
            <input
              id="cs-order"
              className="sme-input"
              name="order"
              type="number"
              step={1}
              defaultValue={cs?.order ?? ""}
              placeholder="Blank = add at the end"
            />
            <p className="adm-hint">Lower numbers come first. The list’s arrows also reorder.</p>
            <label className="adm-label" htmlFor="cs-slug">Slug</label>
            <input
              id="cs-slug"
              className="sme-input"
              name="slug"
              maxLength={120}
              defaultValue={cs?.slug ?? ""}
              placeholder="auto-generated from the name"
            />
          </div>

          <div className="adm-panel">
            <h3>Preview</h3>
            <div
              className={"cs-pv" + (pv.featured ? " featured" : "")}
              aria-label="Preview of the home carousel card"
              role="img"
            >
              <div className="cs-pv-media">
                {pv.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pv.image} alt="" style={pv.imagePosition ? { objectPosition: pv.imagePosition } : undefined} />
                ) : (
                  <span className="cs-pv-empty">No photo yet</span>
                )}
                {pv.sector ? <span className="cs-pv-sector">{pv.sector}</span> : null}
                {pv.country ? <span className="cs-pv-country">{pv.country}</span> : null}
                {pv.videoUrl ? <span className="cs-pv-play" aria-hidden="true">▶</span> : null}
              </div>
              <div className="cs-pv-body">
                {pv.featured ? <span className="cs-pv-tag">Featured Story</span> : null}
                {pv.metric ? <span className="cs-pv-metric">{pv.metric}</span> : null}
                <div className="cs-pv-org">
                  <span className={"cs-pv-logo" + (pv.logoTight ? " tight" : "")}>
                    {pv.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pv.logo} alt="" />
                    ) : (
                      <b>{initials || "Logo"}</b>
                    )}
                  </span>
                  <strong>{pv.name || "Organization name"}</strong>
                </div>
                <p className="cs-pv-quote">“{pv.quote || "The organization’s testimonial appears here."}”</p>
                <div className="cs-pv-foot">
                  <span className="cs-pv-link">{pv.videoUrl ? "Watch Video ▶" : "Read Story →"}</span>
                  <span className="cs-pv-badge">Accredited</span>
                </div>
              </div>
            </div>
            <p className="adm-hint">
              Approximates the home carousel card.
              {!pv.showOnHome && pv.showOnSme ? " The SME page shows the same photo, name, logo and quote in its own layout." : ""}
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

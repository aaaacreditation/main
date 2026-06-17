import PageHero from "../PageHero";

export default function AboutHero() {
  return (
    <PageHero
      image="/hero.jpg"
      eyebrow="About AAA"
      title={<>International accreditation, <em>accepted globally.</em></>}
      intro="AAA is the American Accreditation Association — authorized in the United States by the State Corporation Commission of the Commonwealth of Virginia to transact its business according to its articles of cooperation under Title 13.1 of the Code of Virginia, and to offer a full range of comprehensive accreditation services."
      crumbs={[{ label: "About AAA" }]}
      meta={[
        { k: "Authorized by", v: "Commonwealth of Virginia, USA" },
        { k: "Legal basis", v: "Code of Virginia · Title 13.1" },
        { k: "Areas of competency", v: "10 accreditation programs" },
        { k: "Acceptance", v: "Global" },
      ]}
    />
  );
}

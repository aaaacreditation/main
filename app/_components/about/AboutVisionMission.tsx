import Icon from "../Icon";

export default function AboutVisionMission() {
  return (
    <section className="block vm-block" id="vision-mission">
      <div className="container">
        <div className="vm-grid">
          <div className="vm-card brand reveal">
            <span className="vm-kicker">
              <span className="ico"><Icon name="globe" size={18} strokeWidth={1.6} /></span>
              Our Vision
            </span>
            <p>To provide international accreditation accepted globally.</p>
          </div>
          <div className="vm-card reveal" style={{ transitionDelay: "80ms" }}>
            <span className="vm-kicker">
              <span className="ico"><Icon name="cert" size={18} strokeWidth={1.6} /></span>
              Our Mission
            </span>
            <p>
              To deliver independent, international accreditation programs that provide globally
              accepted confidence of the competence for the accredited organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import '../../../src/styles/Hero.css';

export default function Hero() {
  return (
    <section className="uh-hero">
      <div className="uh-badge">
        <span className="uh-badge-dot"></span>
        Built for UTRGV CECS Students
      </div>

      <h1>
        Your campus,<br />
        <em>all in one place.</em>
      </h1>

      <p>
        Find study partners, discover clubs, RSVP to events, and stay
        connected with the CECS community without - without the noise.
      </p>

      <div className="uh-hero-cta">
        <button className="uh-btn-large">Get Started</button>
        <button className="uh-btn-large-ghost">Browse events</button>
      </div>
    </section>
  );
}
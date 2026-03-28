import '../../../src/styles/Footer.css';

export default function Footer() {
  return (
    <footer className="uh-footer">
      <div className="uh-footer-logo">UniHub</div>
      <ul className="uh-footer-links">
        <li><a href="#">About</a></li>
        <li><a href="#">Events</a></li>
        <li><a href="#">Clubs</a></li>
        <li><a href="#">GitHub</a></li>
      </ul>
      <span className="uh-footer-copy">UTRGV CECS · Spring 2025</span>
    </footer>
  );
}

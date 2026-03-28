import '../../../src/styles/Navbar.css';

export default function Navbar() {
    return (
        <nav className="uh-nav">
        <div className="uh-logo">
          <span className="uh-logo-dot"></span>
          UniHub
        </div>

        <ul className="uh-nav-links">
            <li><a href="#">Events</a></li>
            <li><a href="#">Clubs</a></li>
            <li><a href="#">Study Partners</a></li>
            <li><a href="#">Announcements</a></li>
        </ul>

         <div className="uh-nav-right">
            <button className="uh-btn-ghost">Log in</button>
            <button className="uh-btn-primary">Sign up</button>
        </div>
        </nav>
    );
}
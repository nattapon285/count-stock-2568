import LogoFat from "../assets/logo_fat.jpg";

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar" aria-label="Global">
        <div className="logo-section">
          <a href="/count-stock" className="logo-link">
            <img className="logo-img" src={LogoFat} alt="Logo" />
            <span className="logo-text">นับสต็อก</span>
          </a>
        </div>

        <div className="nav-menu">
          <div className="dropdown">
            <a href="/count-stock" className="dropdown-button">
              นับสต็อก
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

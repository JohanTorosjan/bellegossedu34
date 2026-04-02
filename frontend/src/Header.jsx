import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Bloque le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen)
    return () => document.body.classList.remove("menu-open")
  }, [menuOpen])

  return (
    <header
    style={{ opacity: menuOpen?1:0.8}}>
      <div className="header-right">
        <h1 className="title">
          <Link to="/">Alice.com</Link>
        </h1>
      </div>

      {/* Navigation desktop */}
      <div className="header-left">
        <nav>
          <Link to="/blog">Mon blog</Link>
          <Link to="/animals">Mokmok & Pirouette</Link>
        </nav>
      </div>

      {/* Burger button — visible uniquement sur mobile */}
      <button
        className={`burger ${menuOpen ? "burger--open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Overlay + drawer mobile */}
      <div
        className={`mobile-overlay ${menuOpen ? "mobile-overlay--visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
        <Link to="/blog" className={location.pathname === "/blog" ? "active" : ""}>
          Mon blog
        </Link>
        <Link to="/animals" className={location.pathname === "/animals" ? "active" : ""}>
          Mokmok & Pirouette
        </Link>
      </nav>
    </header>
  )
}
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <div className="footer-class">
      <div className="footer-left">
        <span className="footer-signature">Alice.com</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Site pour stars uniquement</span>
      </div>
      <nav className="footer-nav">
        <Link to="/blog">blog</Link>
        <Link to="/animals">mokmok & pirouette</Link>
        <Link to="/golden-book"> 🎁 25 ans golden book 🎁 </Link>
      </nav>
    </div>
  )
}
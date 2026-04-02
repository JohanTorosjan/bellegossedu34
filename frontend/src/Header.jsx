import { Link } from "react-router-dom"
import './Header.css'
export default function  Header() {
  return (
    <header>
        <div className="header-right">
            <h1 className="title">   
                <Link to="/">Alice.com</Link>  
            </h1>
        </div>
        <div className="header-left">
            <nav>
                <Link to="/blog">Mon blog</Link> -
                <Link to="/animals">Mokmok & Pirouette</Link>
            </nav>
        </div>
    </header>
  )
}

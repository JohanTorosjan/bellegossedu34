// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ChefAlice from "./ChefAlice"
import Animals from "./Animals"
import Blog from "./Blog"
import Header from "./Header"
import Home from "./Home"
import MusicPlayer from "./MusicPlayer"
import Footer from "./Footer"
import './App.css'
import GoldenBook from "./GoldenBook"


export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/chefalice" element={<ChefAlice />} />
          <Route path="/golden-book" element={<GoldenBook />} />
        </Routes>
        </main>
        <footer className="app-footer">
        <Footer />

        </footer>
      </div>
       <MusicPlayer />  {/* ← fixe en bas à droite */}

    </BrowserRouter>
  )
}
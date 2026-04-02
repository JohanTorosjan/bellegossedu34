// src/pages/Home.jsx
import { useEffect, useState } from "react"
import './Home.css'
const images = Array.from({ length: 13 }, (_, i) => new URL(`./assets/${i + 4}.jpg`, import.meta.url).href)

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (

    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}


      <button className="hello-button">
        💐 Voir mon blog 💐
      </button>
    </div>
  )
}
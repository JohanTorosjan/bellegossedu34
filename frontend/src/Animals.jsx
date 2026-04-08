// src/pages/Animals.jsx
import { useEffect, useState } from "react"
import AnimalCard from "./AnimalCard"
import './Animals.css'

const API = "http://37.59.118.12:8001"

export default function Animals() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    fetch(`${API}/animals`)
      .then(res => res.json())
      .then(data => setAnimals(data.reverse()))
  }, [])

  return (
    <div className="animals-content">
        <div className="animals-header">
      <h1 className="animals-title">Mokmok & Pirouette</h1>
        <p className="animals-description">Ici vous pouvez trouver pleins de photos de mes animaux trop mignons ! </p>
        </div>
        <div className="animals-contents-cards">
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
        </div>
    </div>
  )
}
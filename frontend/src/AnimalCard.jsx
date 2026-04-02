// src/components/AnimalCard.jsx
import './AnimalCard.css'
export default function AnimalCard({ animal }) {
  return (
    <div className='animals-div'>
        <div className='animals-photo'>
      <img src={`data:image/jpeg;base64,${animal.photo}`} alt={animal.description} width={300} />
        </div>
      <p className='animals-description'>{animal.description}</p>
      <p className='animals-photo-date'>{new Date(animal.created_at).toLocaleDateString()}</p>
    </div>
  )
}
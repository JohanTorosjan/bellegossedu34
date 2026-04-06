// src/pages/ChefAlice.jsx
import { useState, useEffect } from "react"
import './ChefAlice.css'
const API = "https://api.bellegossedu34.fr"

function AnimalForm({ onCreated }) {
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState(null)
  const [msg, setMsg] = useState("")

  async function submit() {
    const form = new FormData()
    form.append("description", description)
    form.append("photo", photo)
    const res = await fetch(`${API}/animals`, { method: "POST", body: form })
    const data = await res.json()
    setMsg(data.message)
    setDescription("")
    setPhoto(null)
    onCreated()
  }

  return (

    <div>
      <h2>Ajouter une photo trop mignonne</h2>
      <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={submit} disabled={!photo || !description}>Ajouter</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}

function PostForm({ onCreated }) {
  const [form, setForm] = useState({ title: "", description: "" })
  const [photo, setPhoto] = useState(null)
  const [msg, setMsg] = useState("")

  async function submit() {
    const data = new FormData()
    data.append("title", form.title)
    data.append("description", form.description)
    data.append("photo", photo)
    const res = await fetch(`${API}/posts`, { method: "POST", body: data })
    const json = await res.json()
    setMsg(json.message)
    setForm({ title: "", description: "" })
    setPhoto(null)
    onCreated()
  }

  return (
    <div>
      <h2>Ajouter un post</h2>
      <input placeholder="Titre" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <button onClick={submit} disabled={!photo || !form.title || !form.description}>Ajouter</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}

function AnimalList({ animals, onDelete }) {
  return (
    <div>
      <h2>Mokmok & rouet existants</h2>
      {animals.map(a => (
        <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>{a.description.slice(0, 40)}...</span>
          <button onClick={() => onDelete("animals", a.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  )
}

function PostList({ posts, onDelete }) {
  return (
    <div>
      <h2>Posts existants</h2>
      {posts.map(p => (
        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>{p.title}</span>
          <button onClick={() => onDelete("posts", p.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  )
}

export default function ChefAlice() {
  const [animals, setAnimals] = useState([])
  const [posts, setPosts] = useState([])

  async function fetchAll() {
    const [a, p] = await Promise.all([
      fetch(`${API}/animals`).then(r => r.json()),
      fetch(`${API}/posts`).then(r => r.json()),
    ])
    setAnimals(a)
    setPosts(p)
  }

  useEffect(() => { fetchAll() }, [])

  async function handleDelete(table, id) {
    await fetch(`${API}/${table}/${id}`, { method: "DELETE" })
    fetchAll()
  }

  return (
    <div className="chefalice-page">
      <h1>Chef Alice 🫡 </h1>
      <AnimalForm onCreated={fetchAll} />
      <hr />
      <PostForm onCreated={fetchAll} />
      <hr />
      <AnimalList animals={animals} onDelete={handleDelete} />
      <hr />
      <PostList posts={posts} onDelete={handleDelete} />
    </div>
  )
}
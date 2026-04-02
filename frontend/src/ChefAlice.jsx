import { useState } from "react"

const API = "http://localhost:8000"

function AnimalForm() {
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
  }

  return (
    <div>
      <h2>Ajouter un animal</h2>
      <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={submit} disabled={!photo || !description}>Ajouter</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}

function PostForm() {
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

export default function ChefAlice() {
  return (
    <div>
      <h1>Chef Alice 👩‍🍳</h1>
      <AnimalForm />
      <hr />
      <PostForm />
    </div>
  )
}
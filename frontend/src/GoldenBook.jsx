// src/pages/GoldenBook.jsx
import { useState, useEffect } from "react"
import './GoldenBook.css'

const API = "http://localhost:8000"

export default function GoldenBook() {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ author: "", message: "" })
  const [msg, setMsg] = useState("")
  const [open, setOpen] = useState(false)

  async function fetchEntries() {
    const res = await fetch(`${API}/golden-book`)
    const data = await res.json()
    setEntries(data)
  }

  useEffect(() => { fetchEntries() }, [])

  async function submit() {
    const res = await fetch(`${API}/golden-book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setMsg(data.message)
    setForm({ author: "", message: "" })
    fetchEntries()
    setTimeout(() => { setOpen(false); setMsg("") }, 1500)
  }

  return (
    <div className="goldenbook-page">

      <div className="goldenbook-header">
        <h1 className="goldenbook-title">25 Ans Golden Book</h1>
        <p className="goldenbook-subtitle"> Un petit message pour notre star 💋</p>
        <button className="goldenbook-open-btn" onClick={() => setOpen(true)}>
          Laisser un message
        </button> 
      </div>

      {/* MODALE */}
      {open && (
        <div className="goldenbook-overlay" onClick={() => setOpen(false)}>
          <div className="goldenbook-modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Ton message 💌</h2>

            <input
              className="goldenbook-input"
              placeholder="Ton prénom"
              value={form.author}
              onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
            />
            <textarea
              className="goldenbook-textarea"
              placeholder="Ton message..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />

            {msg && <p className="goldenbook-confirm">{msg}</p>}

            <div className="modal-actions">
              <button
                className="goldenbook-submit-btn"
                onClick={submit}
                disabled={!form.author || !form.message}
              >
                Envoyer 
              </button>
              <button className="goldenbook-cancel-btn" onClick={() => setOpen(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTE */}
      <div className="goldenbook-entries">
        {entries.map((entry, i) => (
          <div className="goldenbook-entry" key={entry.id}>
            {/* <div className="entry-number">#{String(entries.length - i).padStart(2, '0')}</div> */}
            <div className="entry-body">
              <p className="entry-message">"{entry.message}"</p>
              <div className="entry-meta">
                <span className="entry-author">— {entry.author}</span>
                {/* <span className="entry-date">{new Date(entry.created_at).toLocaleDateString()}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
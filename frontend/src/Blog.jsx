// src/pages/Blog.jsx
import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import './Blog.css'
const API = "http://localhost:8000"

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${API}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <div className="blog-content">
        <div className="intro-blog">
            <h1 className="blog-title-text">Mon blog</h1> 
            <p className="blog-title-description">
                Bienvenue sur mon blog de bad bitch !
                Vous pouvez retrouver toutes mes actualités en temps réel.
            </p>
        </div>
        <div className="blog-content-cards">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
        </div>
    </div>
  )
}
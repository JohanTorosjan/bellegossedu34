// src/components/PostCard.jsx
import './PostCard.css'
export default function PostCard({ post }) {
  return (
    <div className="postcard-div">
        <div className="postcard-header">
            <h2 className='postcard-title'>{post.title}</h2> - <p className='postcard-date'>{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
        
        <div className="postdard-photo">
      <img src={`data:image/jpeg;base64,${post.photo}`} alt={post.title} width={300} />
        </div>
     <div className="postcard-description">
      <p className='postcard-desdcription-text'>{post.description}</p>
     </div>
    </div>
  )
}
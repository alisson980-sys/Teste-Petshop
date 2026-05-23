import { blogPosts } from '../data/mockData';
import { Calendar, User } from 'lucide-react';
import './Blog.css';

export function Blog() {
  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>Blog PetShop</h1>
        <p>Dicas e novidades para seu pet</p>
      </div>

      <div className="posts-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-post-card">
            <img src={post.image} alt={post.title} />
            <div className="post-content">
              <span className="category">{post.category}</span>
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span><User size={16} /> {post.author}</span>
                <span><Calendar size={16} /> {new Date(post.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <p>{post.excerpt}</p>
              <button className="btn btn-outline">Ler Mais</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

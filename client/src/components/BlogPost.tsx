import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/BlogPost.css';

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  mediaUrl?: string;
  User: {
    username: string;
  };
  createdAt: string;
  userId: number;
  onDelete: (id: number) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  content,
  mediaUrl,
  User,
  createdAt,
  userId,
  onDelete,
}) => {
  const { user } = useAuth();

  return (
    <div className="card mb-4 blog-post">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle mb-2 text-muted">
          By {User.username} on {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="card-text">{content}</p>
        {mediaUrl && (
          <div className="post-media my-3">
            {mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img src={mediaUrl} alt="Post media" className="img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} />
            ) : (
              <video src={mediaUrl} controls className="w-100" style={{ maxHeight: '400px' }}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        {user && user.id === userId && (
          <div className="post-actions mt-3">
            <Link to={`/edit-post/${id}`} className="btn btn-primary me-2">
              Edit
            </Link>
            <button onClick={() => onDelete(id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;


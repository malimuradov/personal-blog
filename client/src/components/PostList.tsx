import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from './BlogPost';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: number;
  title: string;
  content: string;
  mediaUrl?: string;
  User: {
    username: string;
  };
  createdAt: string;
  userId: number;
}

interface PostListProps {
  showOnlyUserPosts?: boolean;
}

const PostList: React.FC<PostListProps> = ({ showOnlyUserPosts = false }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        let fetchedPosts = response.data;
        if (showOnlyUserPosts && user) {
          fetchedPosts = fetchedPosts.filter((post: Post) => post.userId === user.id);
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
        setError('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, [showOnlyUserPosts, user]);

  const handleDelete = async (id: number) => {
    if (!user || !token) {
      setError('You must be logged in to delete a post');
      return;
    }

    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post', error);
      setError('Failed to delete post');
    }
  };

  return (
    <div>
      <h2>{showOnlyUserPosts ? 'My Posts' : 'All Blog Posts'}</h2>
      {error && <p className="error">{error}</p>}
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          {...post}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );

};

export default PostList;


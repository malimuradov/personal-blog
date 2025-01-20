import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Personal Blog</h1>
      {user && (
        <Link to="/create-post" className="create-post-button">
          Create New Post
        </Link>
      )}
      <PostList />
    </div>
  );
};

export default Home;



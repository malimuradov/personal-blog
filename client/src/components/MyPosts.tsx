import React from 'react';
import PostList from './PostList';

const MyPosts: React.FC = () => {
  return (
    <div className="my-posts">
      <PostList showOnlyUserPosts={true} />
    </div>
  );
};

export default MyPosts;
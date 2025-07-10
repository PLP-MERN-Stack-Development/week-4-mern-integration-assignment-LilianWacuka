import { useEffect, useState } from "react";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { postService } from '../../services/api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postService.getAllPosts();
        setPosts(res.data || []);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card>
      <div>
        <h2>All Posts</h2>
        {posts.length === 0 && <p>No posts found.</p>}
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <small>By: {post.user?.username || "Unknown"}</small>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default PostList;
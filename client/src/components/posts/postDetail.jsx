import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../../services/api';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useAuth } from '../context/authContext';

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-6 text-sm text-gray-500">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.category && (
            <span className="ml-4 bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {post.category.name}
            </span>
          )}
        </div>
        <div className="prose max-w-none">
          {post.content}
        </div>
        
        {user && (
          <div className="mt-6 flex space-x-4">
            <Button as="Link" to={`/posts/${post._id}/edit`}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </Card>
      
      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {/* Implement comments here */}
      </div>
    </div>
  );
};

export default PostDetail;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService, categoryService, authService } from '../../services/api';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [catError, setCatError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getAllCategories()
      .then((res) => {
        const data = res.data?.data;
        setCategories(Array.isArray(data) ? data : []);
        if (!data || data.length === 0) setCatError('No categories found. Please create one first.');
        else setCatError('');
      })
      .catch((err) => {
        setCatError('Failed to load categories.');
        setCategories([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser._id) {
      setError('You must be logged in to create a post.');
      navigate('/login');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }

    const postData = {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      isPublished,
      user: currentUser._id,
    };

    try {
      const created = await postService.createPost(postData);
      if (created && created.data && created.data._id) {
        navigate(`/posts/${created.data._id}`);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Post creation failed.');
      console.error('Post creation failed:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {catError && <div className="text-red-500 mb-2">{catError}</div>}
      {/* Debug: show categories */}
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" required />
      </div>

      <div>
        <label className="block font-medium mb-1">Excerpt</label>
        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description" />
      </div>

      <div>
        <label className="block font-medium mb-1">Content</label>
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Featured Image URL</label>
        <Input value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="http://example.com/image.jpg" />
      </div>

      <div>
        <label className="block font-medium mb-1">Category</label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-medium mb-1">Tags (comma separated)</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. react, node, webdev" />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label className="text-sm">Publish immediately</label>
      </div>

      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );
};

export default PostForm;

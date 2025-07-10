import { useState } from 'react';
import { categoryService, authService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const CategoryForm = ({ category, onSuccess }) => {
  const [name, setName] = useState(category?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser._id) {
      setError('You must be logged in to manage categories.');
      setDebug('No user found in localStorage.');
      navigate('/postList');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setDebug('');

      let response;
      if (category) {
        response = await categoryService.updateCategory(category._id, { name });
      } else {
        response = await categoryService.createCategory({ name });
      }
      setDebug(JSON.stringify(response, null, 2));

      if (onSuccess) onSuccess();
      setName('');
    } catch (err) {
      setDebug(err?.response?.data ? JSON.stringify(err.response.data, null, 2) : String(err));
      setError('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {debug && <pre className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-2">{debug}</pre>}

      <Input
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Enter category name"
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
};

export default CategoryForm;

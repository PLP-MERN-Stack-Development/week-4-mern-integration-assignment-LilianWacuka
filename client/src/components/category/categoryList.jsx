import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/api';
import CategoryForm from './categoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await categoryService.getAllCategories();
      setCategories(res.data || []);
    } catch (error) {
      setError('Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <CategoryForm onSuccess={fetchCategories} />
      <ul className="list-disc pl-5">
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

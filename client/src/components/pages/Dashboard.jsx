import React from "react";
import { Link } from 'react-router-dom';
import API from '../../services/api';
import PostList from '../posts/postList';
import { NavigationMenu } from '../ui/navigation-menu';
import PostForm from "../posts/postForm";
import PostDetail from "../posts/postDetail";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md">
        <NavigationMenu />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome to your dashboard! Here you can manage your posts.</p>

        <Link
          to="/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
        >
           Create New Post
        </Link>

        <div>
          <PostDetail />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

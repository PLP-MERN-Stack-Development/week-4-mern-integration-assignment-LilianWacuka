import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import Login from "./components/pages/Login";
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import PostList from './components/posts/postList';
import PostDetail from './components/posts/postDetail';
import PostForm from './components/posts/postForm';

import CategoryList from './components/category/categoryList';
import CategoryForm from './components/category/categoryForm';
import ProtectedRoute from './components/pages/protectedRoute';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/category">Categories</Link>
      </nav>
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Route>
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/create" element={<CategoryForm />} />
      </Routes>
    </Router>
  );
}

export default App;

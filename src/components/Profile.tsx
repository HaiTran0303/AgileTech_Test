import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewPost from './NewPost';
import EditPost from './EditPost';
import Logo from '../assets/img/logo.png';

interface Post {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }
  
const Profile: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, [title, page]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<{ posts: Post[]; totalPages: number }>(`https://api-test-web.agiletech.vn/posts?title=${title}&page=${page}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  const fetchTags = async () => {
    try {
      const response = await axios.get('https://api-test-web.agiletech.vn/posts/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const handleAddNewPost = () => {
    setIsAdding(true);
  };

  const handleEditPost = (postId: string) => {
    setIsEditing(postId);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await axios.delete(`https://api-test-web.agiletech.vn/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src={Logo} alt="Logo" className="logo" />
        <button onClick={handleLogout}>Logout</button>
      </header>
      <aside className="sidebar">
        <button onClick={() => navigate('/profile')}>Posts</button>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main className="profile-content">
        <button onClick={handleAddNewPost} className="add-new-btn">Add new</button>
        <div className="search-sort">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="search-input"
          />
          <select className="sort-select">
            {tags.sort().map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <table className="posts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.tags.join(', ')}</td>
                <td>
                  <button onClick={() => handleEditPost(post.id)}>✏️</button>
                  <button onClick={() => handleDeletePost(post.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={page === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
      {isAdding && <NewPost onClose={() => setIsAdding(false)} onAdd={fetchPosts} />}
      {isEditing && <EditPost postId={isEditing} onClose={() => setIsEditing(null)} onEdit={fetchPosts} />}
    </div>
  );
};

export default Profile;

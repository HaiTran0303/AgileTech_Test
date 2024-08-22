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
      const response = await axios.get<{ posts: Post[]; totalPages: number }>(
        `https://api-test-web.agiletech.vn/posts?title=${title}&page=${page}`
      );
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
    <div className="flex">
      <aside className="w-1/5 bg-gray-200 h-screen p-4">
      <a href='/'><img src={Logo} alt="Logo" className="w-12 h-12" /></a>
        <button
          onClick={() => navigate('/profile')}
          className="text-gray-700 hover:text-purple-600 mb-4 w-full text-left"
        >
          Posts
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-purple-600 w-full text-left"
        >
          Logout
        </button>
      </aside>

      <main className="w-4/5 p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleAddNewPost}
            className="btn btn-primary"
          >
            Add new
          </button>
          <div className="flex items-center gap-x-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-300 p-2 rounded"
            />
            <select className="border border-gray-300 p-2 rounded">
              <option value="">Tags</option>
              {tags.sort().map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="border border-gray-300 p-4">ID</th>
              <th className="border border-gray-300 p-4">Title</th>
              <th className="border border-gray-300 p-4">Description</th>
              <th className="border border-gray-300 p-4">Tags</th>
              <th className="border border-gray-300 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="text-center">
                <td className="border border-gray-300 p-4">{post.id}</td>
                <td className="border border-gray-300 p-4">{post.title}</td>
                <td className="border border-gray-300 p-4">{post.description}</td>
                <td className="border border-gray-300 p-4">{post.tags.join(', ')}</td>
                <td className="border border-gray-300 p-4">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="text-yellow-500 hover:text-yellow-600 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 border rounded ${
                page === index + 1 ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>

      {isAdding && <NewPost onClose={() => setIsAdding(false)} onAdd={fetchPosts} />}
      {isEditing && (
        <EditPost postId={isEditing} onClose={() => setIsEditing(null)} onEdit={fetchPosts} />
      )}
    </div>
  );
};

export default Profile;

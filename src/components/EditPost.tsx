import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditPostProps {
  postId: string;
  onClose: () => void;
  onEdit: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ postId, onClose, onEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://api-test-web.agiletech.vn/posts/${postId}`);
        const { title, description, tags } = response.data;
        setTitle(title);
        setDescription(description);
        setSelectedTags(tags);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get('https://api-test-web.agiletech.vn/posts/tags');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchPostData();
    fetchTags();
  }, [postId]);

  const handleEditPost = async () => {
    try {
      await axios.patch(`https://api-test-web.agiletech.vn/posts/${postId}`, {
        title,
        description,
        tags: selectedTags,
      });
      onEdit();
      onClose();
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="tags">
          {availableTags.sort().map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagSelection(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
        <button onClick={handleEditPost}>Edit Post</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPost;

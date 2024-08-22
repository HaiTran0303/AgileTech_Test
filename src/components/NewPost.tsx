import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NewPostProps {
  onClose: () => void;
  onAdd: () => void;
}

const NewPost: React.FC<NewPostProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('https://api-test-web.agiletech.vn/posts/tags');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleAddPost = async () => {
    try {
      await axios.post('https://api-test-web.agiletech.vn/posts', {
        title,
        description,
        tags: selectedTags,
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error adding post:', error);
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
        <h2>Add New Post</h2>
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
        <button onClick={handleAddPost}>Add Post</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPost;

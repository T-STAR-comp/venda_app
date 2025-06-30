import React, { useState } from 'react';
import styles from './styles/postAd.module.css';

const categories = [
  'Vehicles',
  'Real Estate',
  'Electronics',
  'Sports & Outdoors',
  'Commercial',
  'Fashion',
];

const PostAdModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    location: '',
    image: null,
    description: '',
    category: '',
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual ad posting logic
    setTimeout(() => {
      setLoading(false);
      if (onSubmit) onSubmit(form);
      if (onClose) onClose();
    }, 1200);
  };

  return (
    <div className={styles.postAdOverlay} onClick={onClose}>
      <div className={styles.postAdModal} onClick={e => e.stopPropagation()}>
        <div className={styles.postAdCloseIcon} onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.postAdTitle}>Post a New Ad</div>
        <form className={styles.postAdForm} onSubmit={handleSubmit}>
          <label className={styles.postAdLabel}>Item Name
            <input
              className={styles.postAdInput}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Toyota Corolla 2020"
              required
            />
          </label>
          <label className={styles.postAdLabel}>Price (MWK)
            <input
              className={styles.postAdInput}
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 1500000"
              type="number"
              min="0"
              required
            />
          </label>
          <label className={styles.postAdLabel}>Location
            <input
              className={styles.postAdInput}
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Lilongwe"
              required
            />
          </label>
          <label className={styles.postAdLabel}>Category
            <select
              className={styles.postAdInput}
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label className={styles.postAdLabel}>Image
            <input
              className={styles.postAdInput}
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
          {preview && (
            <img src={preview} alt="Preview" className={styles.postAdPreview} />
          )}
          <label className={styles.postAdLabel}>Description
            <textarea
              className={styles.postAdInput}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your item..."
              rows={3}
              required
            />
          </label>
          <button className={styles.postAdBtn} type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Ad'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAdModal;
import React, { useState } from 'react';
import styles from './styles/postAd.module.css';
import Loader from '../../components/loader';

const categories = [
  'Vehicles',
  'Real Estate',
  'Electronics',
  'Sports & Outdoors',
  'Commercial',
  'Fashion',
];

const PostAdModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    product_name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Posting...');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoaderMessage('Posting your ad...');
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('username', form.username);
      formData.append('product_name', form.product_name);
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('location', form.location);
      formData.append('description', form.description);
      if (form.image) {
        formData.append('image', form.image);
      } else {
        throw new Error('Please upload an image.');
      }

      const response = await fetch(import.meta.env.VITE_POSTAD_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.status === 'ok') {
        setSuccess(true);
        setLoaderMessage('Ad posted successfully!');
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setForm({
            email: '',
            username: '',
            product_name: '',
            category: '',
            price: '',
            location: '',
            description: '',
            image: null,
          });
          setPreview(null);
          if (onClose) onClose();
        }, 1200);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err.message || 'Failed to post ad. Please try again.');
      setLoaderMessage('Failed to post ad.');
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <div className={styles.postAdOverlay} onClick={onClose}>
      <div className={styles.postAdModal} onClick={(e) => e.stopPropagation()}>
        {loading && <Loader message={loaderMessage} onClose={() => setLoading(false)} />}
        <div className={styles.postAdCloseIcon} onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.postAdTitle}>Post a New Ad</div>
        {error && (
          <div style={{ color: '#D7263D', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
        )}
        <form className={styles.postAdForm} onSubmit={handleSubmit}>
          <label className={styles.postAdLabel}>Email
            <input
              className={styles.postAdInput}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. you@email.com"
              required
            />
          </label>
          <label className={styles.postAdLabel}>Username
            <input
              className={styles.postAdInput}
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. samuel123"
              required
            />
          </label>
          <label className={styles.postAdLabel}>Product Name
            <input
              className={styles.postAdInput}
              name="product_name"
              value={form.product_name}
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
              {categories.map((cat) => (
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
              required
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

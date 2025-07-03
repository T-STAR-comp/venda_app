import React, { useState } from 'react';
import styles from './UserAds.module.css';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function getImageUrl(ad) {
  if (ad.image && ad.image.startsWith('/9j/')) {
    return `data:image/jpeg;base64,${ad.image}`;
  } else if (ad.img_path) {
    return `/api/${ad.img_path.replace(/\\/g, '/')}`;
  }
  return ad.image || '';
}

function getStatusClass(status) {
  if (!status) return styles.statusBadge;
  if (status.toLowerCase() === 'active') return styles.statusBadge + ' ' + styles.active;
  if (status.toLowerCase() === 'pending') return styles.statusBadge + ' ' + styles.pending;
  if (status.toLowerCase() === 'rejected') return styles.statusBadge + ' ' + styles.rejected;
  return styles.statusBadge;
}

const DELETE_URL = import.meta.env.VITE_DELETEAD_URL;

function UserAds({ open, onClose, ads, userEmail }) {
  const [adToDelete, setAdToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [localAds, setLocalAds] = useState([]);

  React.useEffect(() => {
    setLocalAds(ads);
  }, [ads]);

  if (!open) return null;

  const handleDelete = (ad) => {
    setAdToDelete(ad);
    setDeleteMsg('');
  };

  const confirmDelete = async () => {
    if (!adToDelete) return;
    setDeleting(true);
    setDeleteMsg('');
    try {
      const res = await fetch(DELETE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: adToDelete.id })
      });
      const data = await res.json();
      if (res.ok && data.message && data.message.toLowerCase().includes('deleted')) {
        setDeleteMsg('Ad deleted successfully.');
        setLocalAds(prev => prev.filter(ad => ad.id !== adToDelete.id));
        setTimeout(() => {
          setAdToDelete(null);
          setDeleteMsg('');
        }, 1200);
      } else {
        setDeleteMsg(data.message || 'Failed to delete ad.');
      }
    } catch (err) {
      setDeleteMsg('Error: ' + (err.message || 'Failed to delete ad.'));
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setAdToDelete(null);
    setDeleteMsg('');
  };

  const userAds = localAds.filter(ad => ad.email && ad.email === userEmail);
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <h2 className={styles.title}>My Ads</h2>
        {userAds.length === 0 ? (
          <div className={styles.emptyMsg}>You have not posted any ads yet.</div>
        ) : (
          <div>
            {userAds.map(ad => (
              <div key={ad.id} className={styles.adCard}>
                <span className={getStatusClass(ad.status)}>{ad.status ? ad.status.charAt(0).toUpperCase() + ad.status.slice(1) : 'Unknown'}</span>
                <button className={styles.deleteBtn} title="Delete" onClick={() => handleDelete(ad)} disabled={deleting}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8.5V14.5M10 8.5V14.5M14 8.5V14.5M3 5.5H17M8.5 3.5H11.5C12.0523 3.5 12.5 3.94772 12.5 4.5V5.5H7.5V4.5C7.5 3.94772 7.94772 3.5 8.5 3.5Z" stroke="#d7263d" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className={styles.adTitle}>{ad.title || ad.product_name}</div>
                <div className={styles.adPrice}>{ad.price}</div>
                <div className={styles.adMeta}>{ad.location} • {formatDate(ad.created_at)}</div>
                {getImageUrl(ad) && <img src={getImageUrl(ad)} alt={ad.product_name || ad.title} className={styles.adImage} />}
                <div className={styles.adDescription}>{ad.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Custom confirmation modal */}
        {adToDelete && (
          <div className={styles.confirmOverlay}>
            <div className={styles.confirmModal}>
              <div className={styles.confirmTitle}>Delete Ad?</div>
              <div className={styles.confirmMsg}>
                Are you sure you want to delete <b>{adToDelete.title || adToDelete.product_name}</b>?<br />This action cannot be undone.
              </div>
              {deleteMsg && <div style={{color: deleteMsg.includes('success') ? '#1a7f37' : '#d7263d', marginBottom: '0.7rem'}}>{deleteMsg}</div>}
              <div className={styles.confirmActions}>
                <button className={styles.confirmBtn} onClick={confirmDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button className={styles.cancelBtn} onClick={cancelDelete} disabled={deleting}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAds; 
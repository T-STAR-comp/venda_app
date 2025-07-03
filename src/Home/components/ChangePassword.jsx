import React, { useState } from 'react';
import styles from './UserAds.module.css';

const CHANGEPASS_URL = import.meta.env.VITE_CHANGEPASS_URL;

function ChangePassword({ open, onClose }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (!current || !next || !confirm) {
      setMsg('Please fill in all fields.');
      return;
    }
    if (next !== confirm) {
      setMsg('New passwords do not match.');
      return;
    }
    const user = sessionStorage.getItem('user');
    const email = sessionStorage.getItem('user_email');
    if (!user || !email) {
      setMsg('You must be logged in to change your password.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(CHANGEPASS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          oldPassword: current,
          newPassword: next
        })
      });
      const data = await res.json();
      if (res.ok && data.message) {
        setMsg(data.message);
        setCurrent(''); setNext(''); setConfirm('');
        setTimeout(() => { setMsg(''); onClose(); }, 1500);
      } else {
        setMsg(data.error || 'Failed to change password.');
      }
    } catch (err) {
      setMsg('Error: ' + (data.error || 'Failed to change password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <h2 className={styles.title}>Change Password</h2>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.1rem',marginTop:'1.2rem'}}>
          <input
            type="password"
            placeholder="Current password"
            value={current}
            onChange={e => setCurrent(e.target.value)}
            className={styles.adDescription}
            style={{padding:'0.7em',border:'1px solid #eee',borderRadius:6,fontSize:'1rem'}}
            autoFocus
          />
          <input
            type="password"
            placeholder="New password"
            value={next}
            onChange={e => setNext(e.target.value)}
            className={styles.adDescription}
            style={{padding:'0.7em',border:'1px solid #eee',borderRadius:6,fontSize:'1rem'}}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className={styles.adDescription}
            style={{padding:'0.7em',border:'1px solid #eee',borderRadius:6,fontSize:'1rem'}}
          />
          {msg && <div style={{color:msg.toLowerCase().includes('success')?'#1a7f37':'#d7263d',fontWeight:500}}>{msg}</div>}
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'0.5rem'}}>
            <button type="submit" className={styles.confirmBtn} disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={loading}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword; 
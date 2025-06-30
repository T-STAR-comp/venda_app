import React from 'react';
import styles from './styles/options.module.css';

const options = [
  {
    label: 'Change Password',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="8" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    key: 'changePassword',
  },
  {
    label: 'Post Ad',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
    ),
    key: 'postAd',
  },
  {
    label: 'View My Ads',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4M2 11h20"/></svg>
    ),
    key: 'viewAds',
  },
  {
    label: 'Logout',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    ),
    key: 'logout',
  },
];

const OptionsModal = ({ open, onClose, onOption }) => {
  if (!open) return null;
  return (
    <div className={styles.optionsOverlay} onClick={onClose}>
      <div className={styles.optionsModal} onClick={e => e.stopPropagation()}>
        <div className={styles.optionsCloseIcon} onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.optionsTitle}>Account Options</div>
        <div className={styles.optionsList}>
          {options.map(opt => (
            <button
              key={opt.key}
              className={styles.optionsItem}
              onClick={() => onOption && onOption(opt.key)}
              type="button"
            >
              <span className={styles.optionsIcon}>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionsModal; 
import React from 'react';
import styles from './styles/NotFound.module.css';

const NotFound = ({ onHome }) => (
  <div className={styles.notFoundBg}>
    <div className={styles.notFoundCard}>
      <div className={styles.notFoundCode}>404</div>
      <div className={styles.notFoundMsg}>Oops! The page you're looking for doesn't exist.</div>
      <button className={styles.notFoundBtn} onClick={() => window.location.href = '/'}>
        Go back home
      </button>
    </div>
  </div>
);

export default NotFound; 
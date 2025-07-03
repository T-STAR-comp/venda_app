import styles from './styles/styles.module.css';

const Loader = ({message, onClose}) => (
  <div className={styles.loaderOverlay}>
    <div className={styles.loaderSpinner}>
      <div className={styles.loaderRing}></div>
      <span className={styles.loaderText}>{message}</span>
      <button className={styles.loaderClose} onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Loader;
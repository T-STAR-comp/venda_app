import styles from './styles/styles.loader.css';

const Loader = () => (
  <div className={styles.loaderOverlay}>
    <div className={styles.loaderSpinner}>
      <div className={styles.loaderRing}></div>
      <span className={styles.loaderText}>Loading...</span>
    </div>
  </div>
);

export default Loader;
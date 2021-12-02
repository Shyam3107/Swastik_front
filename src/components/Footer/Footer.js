import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      CopyRight &copy;2021 Swastik Minerals
    </footer>
  );
};

const OfflineFooter = () => {
  return <footer className={styles.offlineFooter}>You are Offline</footer>;
};

export default Footer;
export { OfflineFooter };

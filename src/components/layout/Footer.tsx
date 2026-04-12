import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>CLEANMess</p>
          <p className={styles.tagline}>IoT + AI food safety for college canteens</p>
        </div>
        <p className={styles.copy}>
          © {year} CLEANMess. Built for safer meals.
        </p>
      </div>
    </footer>
  );
}

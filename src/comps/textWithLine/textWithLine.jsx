import styles from "./textWithLine.module.css";

export default function textWithLine({ text }) {
  return (
    <div className={`${styles.title}`}>
      <h2>{text}</h2>
      <div className={styles.line}></div>
    </div>
  );
}

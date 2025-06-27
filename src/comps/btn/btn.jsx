import styles from "./btn.module.css";

export default function btn({ fullWidth = false, children, link, func }) {
  return (
    <button
      onClick={() => {
        if (func != null || func != undefined) {
          func();
        }
      }}
      className={`${styles.btn} ${fullWidth ? styles.fullWidth : ""}`}
    >
      {children}
    </button>
  );
}

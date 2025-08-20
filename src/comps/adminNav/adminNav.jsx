import styles from "./adminNav.module.css";

export default function adminNav() {
  return (
    <>
      <section className={styles.adminNav}>
        <a href="/admin/addprod">
          <button>Tilføj produkt</button>
        </a>
        <a href="/admin/seeprod">
          <button>Se produkter</button>
        </a>
      </section>
    </>
  );
}

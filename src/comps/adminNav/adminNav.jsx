import { useNavigate } from "react-router";
import styles from "./adminNav.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function adminNav() {
  const [login, setLogin] = useLocalStorage("loginToken", null); //Få token fra localstorage. Hvis ikke en er sat, så null.
  const nav = useNavigate();

  const logout = (event) => {
    event.preventDefault();

    setLogin(null);

    nav("/");
  };

  return (
    <>
      <section className={styles.adminNav}>
        <a href="/admin/addprod">
          <button>Tilføj produkt</button>
        </a>
        <a href="/admin/seeprod">
          <button>Se produkter</button>
        </a>
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </section>
    </>
  );
}

import styles from "./nav.module.css";
import { NavLink } from "react-router";

export default function nav({}) {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>
            <h2>Shop</h2>
          </div>
          <ul>
            <li>
              <NavLink to={"/"}>Produkter</NavLink>
            </li>
            <li>
              <NavLink to={"/cart"}>Kurv</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

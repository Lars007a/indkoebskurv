import styles from "./prodCard.module.css";
import test from "../../assets/standard.jpg";
import Btn from "../btn/btn.jsx";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart.jsx";

export default function prodCard({ obj }) {
  const cart = useCart();

  const btnClick = (productToAdd) => {
    cart.addItem(productToAdd);
  };

  return (
    <article className={styles.card}>
      <img src={obj?.image} alt={`Product billed for ${obj?.title}`} />
      <section className={styles.content}>
        <div className={styles.top}>
          <h2>{obj?.title}</h2>
          <span>{obj?.category}</span>
        </div>
        <div className={styles.middle}>
          <p>{obj?.description}</p>
        </div>

        <div className={styles.midbm}>
          <h3>{obj?.price},-</h3>
          <p className={styles.stock}>
            På lager: <span>{obj.quantity}</span>
          </p>
        </div>
        <div className={styles.bottom}>
          <Btn
            func={() => {
              btnClick(obj);
            }}
          >
            Tilføj
          </Btn>
          <input type="number" />
        </div>
      </section>
    </article>
  );
}

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
        <div className={styles.bottom}>
          <h3>{obj?.price},-</h3>
          <Btn
            func={() => {
              btnClick(obj);
            }}
          >
            Tilføj
          </Btn>
        </div>
      </section>
    </article>
  );
}

import styles from "./prodCard.module.css";
import test from "../../assets/standard.jpg";
import Btn from "../btn/btn.jsx";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart.jsx";
import { useRef } from "react";
import { useTextShortener } from "../../hooks/useTextShortener.jsx";

export default function prodCard({ obj }) {
  const cart = useCart();
  const qn = useRef(null);
  const descShort = useTextShortener(obj?.description, 110);

  const btnClick = (productToAdd) => {
    //Eventuelt også et tjek med hvor mange der allerede er i carten, og om det ville gå over hvor mange der er i lageret...
    //eventuelt for loop med hvor mange gange der er i qn ref fra input nummer.
    //Og så også et tjek når man adder en i carten.

    cart.addItem(productToAdd, Number(qn.current.value));
  };

  return (
    <article className={styles.card}>
      <img src={obj?.img[0]} alt={`Product billed for ${obj?.title}`} />
      <section className={styles.content}>
        <div className={styles.top}>
          <h2>{obj?.title}</h2>
        </div>
        <div className={styles.middle}>
          <p alt={obj?.description}>{descShort}</p>
        </div>

        <div className={styles.midbm}>
          <h3>{obj?.price},-</h3>
          <p className={styles.stock}>
            På lager: <span>{obj.stock}</span>
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
          <input type="number" placeholder="Antal du ville købe..." ref={qn} />
        </div>
      </section>
    </article>
  );
}

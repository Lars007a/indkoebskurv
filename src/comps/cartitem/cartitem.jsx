import styles from "./cartitem.module.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export function CartItem({ obj, addFunc, removeFunc }) {
  //Enten tager funktionerne som args, eller kører useCart hook her, hvilket ville fetche alle produkter, for hvert produkt i kurven.

  const total = obj.quantity * obj.product.price;

  return (
    <article className={styles.item}>
      <div className={styles.box}>
        <img src={obj.product.image} alt="img" />
      </div>

      <div className={`${styles.box} ${styles.text}`}>
        <h3>{obj.product.title}</h3>
        <div className={styles.pricebox}>
          <h3>{obj.product.price},-</h3>
          <span>{obj.product.category}</span>
        </div>
        <p>{obj.product.description}</p>
      </div>

      <div className={`${styles.box} ${styles.ammount}`}>
        <div>
          <FaMinusCircle
            onClick={() => {
              removeFunc(obj.id);
            }}
          />
          <p>{obj.quantity}</p>
          <FaPlusCircle
            onClick={() => {
              addFunc(obj.product);
            }}
          />
        </div>
        <div>
          <p>
            I alt: <strong className={styles.totalText}>{total},-</strong>
          </p>
        </div>
      </div>
    </article>
  );
}

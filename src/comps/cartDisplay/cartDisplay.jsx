import styles from "./cartDisplay.module.css";
import { CartItem } from "../cartitem/cartitem.jsx";
import { useCart } from "../../hooks/useCart.jsx";

export default function cartDisplay({}) {
  const cart = useCart();

  const total = cart.getTotal();

  return (
    <section className={styles.displaySec}>
      {cart.cart && cart.cart.length > 0 ? (
        cart.cart.map((element) => {
          return (
            <CartItem
              obj={element}
              key={element._id}
              addFunc={cart.addItem}
              removeFunc={cart.removeItem}
              updateFunc={cart}
            />
          );
        })
      ) : (
        <p className={styles.noprods}>Ingen produkter i kurven!</p>
      )}

      <div className={styles.total}>
        <h3>Total</h3>
        <h3>{total},-</h3>
      </div>
    </section>
  );
}

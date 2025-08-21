import { useRef } from "react";
import styles from "./addProdForm.module.css";
import { toast } from "react-toastify";
import { useSendData } from "../../hooks/useRequests.jsx";

export default function addProdForm() {
  const formTing = useRef(null);
  let imgupld = useRef(null);
  let sender = useSendData();

  const onSub = (event) => {
    event.preventDefault();

    const fd = new FormData(formTing.current);

    const title = fd.get("title");
    const desc = fd.get("description");
    const price = fd.get("price");
    const stock = fd.get("stock");

    const imgs = fd.getAll("image");

    if (imgs[0]?.name == "" || imgs.length == 0) {
      toast.error("Skal uploade mindst et billed!");
      return;
    }

    if (!title || !desc || !price || !stock) {
      toast.error("Skal fylde felterne ud!");
      return;
    }

    sender.addProduct(fd);
  };

  return (
    <section className={styles.sec}>
      <form onSubmit={onSub} ref={formTing}>
        <input type="text" name="title" placeholder="Titel..." />
        <textarea name="description" placeholder="Description..."></textarea>
        <div className={`${styles.row} ${styles.pricestock}`}>
          <input type="number" name="price" placeholder="Pris..." />
          <input type="number" name="stock" placeholder="Stock på lager..." />
        </div>
        <div className={styles.row}>
          <div className={styles.row1}>
            <label htmlFor="files">Vælg billeder</label>
            <input type="file" ref={imgupld} id="files" name="image" multiple />
          </div>
        </div>
        <button type="submit">Indsend</button>
      </form>
    </section>
  );
}

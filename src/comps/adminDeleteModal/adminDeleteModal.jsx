import styles from "./adminDeleteModal.module.css";
import { useSendData } from "../../hooks/useRequests.jsx";
import { IoCloseSharp } from "react-icons/io5";

export default function adminDeleteModal({ setter, id, updateFunc }) {
  const d = useSendData();

  const keepfunc = () => {
    setter(null);
  };

  const remove = () => {
    d.generic(null, `prods/${id}`, "DELETE");
    setter(null);
  };

  return (
    <div className={styles.adminDeleteModal}>
      <div className={styles.actualModal}>
        <div className={styles.top}>
          <h2>Sletning af produkt</h2>
          <IoCloseSharp onClick={keepfunc} />
        </div>
        <div className={styles.middle}>
          <p>
            Er du sikker på at du ville fjerne: <span>{id}?</span>
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.cn}>
            <button className={styles.keep} onClick={keepfunc}>
              Behold
            </button>
            <button className={styles.delete} onClick={remove}>
              Fjern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

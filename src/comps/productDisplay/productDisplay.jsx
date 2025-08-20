import styles from "./productDisplay.module.css";
import { useFetchData } from "../../hooks/useRequests.jsx";
import ProdCard from "../prodCard/prodCard.jsx";
import { useEffect, useState } from "react";

export default function productDisplay({}) {
  const req = useFetchData("prods");
  const [toShow, setToShow] = useState([]);

  useEffect(() => {
    if (req.data == null || req.data == undefined) return;

    setToShow(req.data.data);
  }, [req.data]);

  return (
    <section className={styles.display}>
      {toShow.length > 0 ? (
        toShow.map((element) => {
          return <ProdCard obj={element} key={element._id} />;
        })
      ) : (
        <p>Ingen produkter!</p>
      )}
    </section>
  );
}

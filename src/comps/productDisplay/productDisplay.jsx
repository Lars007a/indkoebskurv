import styles from "./productDisplay.module.css";
import { useSendRequest } from "../../hooks/useSendRequest.jsx";
import ProdCard from "../prodCard/prodCard.jsx";
import { useEffect, useState } from "react";

export default function productDisplay({}) {
  /* const req = useSendRequest("products", null);

  useEffect(() => {
    if (req.data == null || req.data == undefined) return;

    console.log(req.data);
  }, [req.data]);
 */

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((val) => {
        return val.json();
      })
      .then((val) => {
        setData(val);
        console.log(val);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <section className={styles.display}>
      {data && data.length > 0 ? (
        data.map((element) => {
          return <ProdCard obj={element} key={element.id} />;
        })
      ) : (
        <p>Ingen produkter!</p>
      )}
    </section>
  );
}

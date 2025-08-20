import styles from "./prodsShow.module.css";
import Spinner from "../spinner/spinner.jsx";
import AdminDeleteModal from "../adminDeleteModal/adminDeleteModal.jsx";
import { useEffect, useState } from "react";
import { useSendData, useFetchData } from "../../hooks/useRequests.jsx";
import adminDeleteModal from "../adminDeleteModal/adminDeleteModal.jsx";

export default function prodsShow() {
  //Get prods, and prepare them, så at de kan blive vist i tabellen nedenfor.

  const r = useFetchData("prods", null);
  const d = useSendData();
  const [toShow, setToShow] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  useEffect(() => {
    if (r.data != undefined || r.data != null) {
      setToShow(r.data.data);
      console.log("not null");
      console.log(toShow);
    }

    console.log("null");
  }, [r.data]);

  //En bekræftning af sletningen skal ske.

  return (
    <>
      <div className={styles.tablecon}>
        {r.loading ? (
          <Spinner />
        ) : toShow.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th>price</th>
                <th>stock</th>
                <th>Slet</th>
              </tr>
            </thead>
            <tbody>
              {toShow.map((element) => {
                return (
                  <tr key={element._id}>
                    <td>{element._id}</td>
                    <td>{element.title}</td>
                    <td>{element.description}</td>
                    <td>{element.price}</td>
                    <td>{element.stock}</td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          //Open admin modal state med værdien id'et, der skal fjernes.
                          setOpenDeleteModal(element._id);
                        }}
                      >
                        Slet
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Ingen produkter!</p>
        )}
      </div>
      {openDeleteModal == null || openDeleteModal == undefined ? (
        ""
      ) : (
        <AdminDeleteModal
          id={openDeleteModal}
          setter={setOpenDeleteModal}
          updateFunc={r.sendRequest}
        />
      )}
    </>
  );
}

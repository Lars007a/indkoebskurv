import styles from "./login.module.css";
import TextWithLine from "../../comps/textWithLine/textWithLine.jsx";
import { useSendData } from "../../hooks/useRequests.jsx";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function loginPage() {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const [login, setLogin] = useLocalStorage("loginToken", null); //Hvor logintoken i localstorage gemmes.

  useEffect(() => {
    //Tjek om de allerede har denne token sat, hvis de har, så er de logget ind, og burde ikke
    //være på denne side.
    if (login != null || login != undefined) {
      navigate("/admin/seeprod");
    }
  }, [login]);

  const send = (event) => {
    event.preventDefault();

    if (!emailRef.current.value || !passRef.current.value) {
      toast.error("Fejl. Skal skrive alle informationer ind!");
      return;
    }

    fetch("http://localhost:3043/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
      }),
    })
      .then((val) => {
        //Når request er færdig og kommer tilbaage.
        return val.json(); //returnere et nyt promise, som vi tager og håndtere i næste .then.
      })
      .then((val) => {
        if (val.status != "ok") {
          toast.error("Følgende fejl: " + val.message);
          return;
        }

        toast.success("Logget ind!");
        setLogin(val.data);
      });
  };

  return (
    <section className={styles.login}>
      <div className="container">
        <article className={styles.box}>
          <TextWithLine text={"Login"} />
          <form onSubmit={send}>
            <input type="email" placeholder="Email..." ref={emailRef} />
            <input type="password" placeholder="Password..." ref={passRef} />
            <input type="submit" value={"Login"} />
          </form>
        </article>
      </div>
    </section>
  );
}

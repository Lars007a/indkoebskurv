import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

//Hook der har funktioner til at at sende og få data til og fra db'en/api'en.

//Fetch produkter fra databasen.
export function useFetchData(endpoint = "prods") {
  //State variabler til at holde på om hvorvidt vi loader, er fejl, og dataen.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  //Funktion til at få dataen.
  const sendRequest = () => {
    //Send en fetch req.
    fetch(`http://localhost:3043/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((val) => {
        //Når promise er resolvet uden fejl, retunere et json promise.
        //medmindere vi ikke har fået et ok respons, så send en fejl.
        return val.json();
      })
      .then((json) => {
        //tag den value json promise resolver til, og sæt data state var til det.
        setData(json);
      })
      .catch((error) => {
        //Hvis der sker en fejl, sæt fejl til fejl beskeden.
        setError(error.message);
      })
      .finally(() => {
        //Til aller aller sidst, sig at vi ikke loader længere.
        setLoading(false);
      });
  };

  //Kør funktionen til at få dataen, når vi loader.
  useEffect(() => {
    sendRequest();
  }, []);

  //Retunere loading state, error state, data state og update funktion.
  return {
    loading,
    error,
    data,
    sendRequest,
  };
}

//hook der har funktioner til at sende data til db'en/api'en.
export function useSendData() {
  const [login, setLogin] = useLocalStorage("loginToken", null); //Hvor logintoken i localstorage gemmes.

  function addProduct(form) {
    fetch(`http://localhost:3043/prods/`, {
      method: "POST",
      headers: {
        authorization: login != null ? login : "",
      },
      body: form,
    })
      .then((val) => {
        //Når promise er resolvet uden fejl, retunere et json promise.
        //medmindere vi ikke har fået et ok respons, så send en fejl.
        return val.json();
      })
      .then((json) => {
        //tag den value json promise resolver til, og sæt data state var til det.
        if (json.status != "ok") {
          throw new Error("Fejl: " + json.message);
        }

        toast.success(json.message);
      })
      .catch((error) => {
        //Hvis der sker en fejl, sæt fejl til fejl beskeden.
        toast.error("Fejl: " + error.message);
      });
  }
  function generic(body, endpoint, method = "GET") {
    fetch(`http://localhost:3043/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: login != null ? login : "",
      },
      body: body,
    })
      .then((val) => {
        //Når promise er resolvet uden fejl, retunere et json promise.
        //medmindere vi ikke har fået et ok respons, så send en fejl.
        return val.json();
      })
      .then((json) => {
        //tag den value json promise resolver til, og sæt data state var til det.
        if (json.status != "ok") {
          throw new Error("Fejl: " + json.message);
        }

        toast.success(json.message);
      })
      .catch((error) => {
        //Hvis der sker en fejl, sæt fejl til fejl beskeden.
        toast.error("Fejl: " + error.message);
      });
  }
  return { addProduct, generic };
}

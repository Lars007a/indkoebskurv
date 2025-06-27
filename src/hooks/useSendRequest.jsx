import { useState, useEffect } from "react";

export function useSendRequest(endpoint, body) {
  //State variabler til at holde på om hvorvidt vi loader, er fejl, og dataen.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  //Funktion til at få dataen.
  const sendRequest = () => {
    //Send en fetch req.
    fetch(`https://fakestoreapi.com/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
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

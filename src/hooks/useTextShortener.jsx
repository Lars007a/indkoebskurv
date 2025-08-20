import { useState, useEffect } from "react";

export function useTextShortener(text, desiredLength) {
  //text er teksten der skal shortes.
  //desiredlength er hvor lang den skal være.

  let [outputText, setOutputText] = useState("");
  //Output tekst er teksten funktionen her returner.

  //Tjekker om desiredlength er et nummer.
  if (isNaN(desiredLength)) {
    setOutputText("Fejl. NaN.");
    return outputText;
  }

  //Når siden loader, eller desiredlength eller tekst ændre sig, køre dette.
  useState(() => {
    if (text.length > desiredLength) {
      //Tjeker om teksten er større end desiredlength.

      let newText; //Laver en ny variablen, til midlertideligt at holde på den midlertidelig tekst.

      newText =
        text //tager text.
          .slice(0, desiredLength) //tager karakter 0 til desiredlength i text.
          .trimEnd() //fjerner sidste mellemrum hvis det er der i den returnerede tekst (karakter 0 til desiredlength i teksten).
          .slice(0, text.slice(0, desiredLength).trimEnd().lastIndexOf(" ")) +
        "..."; //tager så den tekst, og tager første karakter derfra, og fjerner indtil det sidste mellemrum i samme tekst, for at få det til at være et helt ord.

      console.log(newText);

      setOutputText(newText);
    } else {
      //Hvis at text passed in som parameter er mindre end desiredlength, så
      //bare retunere teksten som den er.
      setOutputText(text);
    }
  }, [text, desiredLength]);

  return outputText;
}

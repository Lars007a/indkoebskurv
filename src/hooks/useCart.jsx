import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

//Hook der har funktioner til at arbejde med kurven.

export function useCart() {
  const [cart, setCart] = useLocalStorage("cart", []); //Gemmer cart i localstorage.

  //Funktion til at tilføje en item til cart.
  //itemElement er hvad der skal tilføjes, og ammount er hvor meget.
  const addItem = (itemElement, ammount) => {
    //gemt i arrayen som et object, med quantity og product field.

    if (ammount == 0) {
      //Hvis ammount er 0, så giver vi en fejl.
      toast.error("Skal skrive et nummer ind!");
      return;
    }

    let newArray = [...cart]; //Laver en kopi af kurven vi kan arbejde med.

    const index = cart.findIndex(
      (element) => element.product._id == itemElement._id
    ); //Finder index, hvor id'et gemt i localstorage cart passer med id'et af elementet der
    //bliver tilføjet.

    //Hvis ikke noget index er fundet, så er produktet ikke tilføjet til kurven, og
    //vi kan tilføje det.
    if (index == -1) {
      if (ammount > itemElement.stock) {
        //Tjekker om tilføjet mere end der er i stock.
        toast.error("Fejl. Ikke nok på lager!");
        return;
      }

      //Hvis ikke, tilføj det til kurven.
      newArray.push({
        product: itemElement,
        quantity: Number(ammount),
      });
      toast.success("Produkt tilføjet til kurv!");
    } else {
      //Hvis vi fandt et index, i.e, produktet er tilføjet til kurven i forvejen,
      //skal vi bare oppe quantity.

      for (let i = 0; i < newArray.length; i++) {
        //Loop over cart.

        if (newArray[i].product._id == itemElement._id) {
          //Hvis produktet id passer med det element vi tilføjet til's id.

          if (newArray[i].quantity + ammount > newArray[i].product.stock) {
            //Tjekker om den tilføjelse til quantity vi ville lave ville få produktet til at gå over stock.

            toast.error("Alle af dette produkt på lageret er i taget!");
          } else {
            //Hvis ikke ville få til at gå ud af stock, så tilføj produktet med korrekt ammount til kurven.

            newArray[i].quantity = Number(newArray[i].quantity + ammount);
            toast.success("Produkt quantity forhøjet!");
          }
        }
      }
    }

    setCart(newArray);
  };

  const removeItem = (itemID) => {
    console.log(itemID);

    //Lav en kopi af kurven.
    let newArray = [...cart];

    //Find indexet hvor elementet passer med id'et vi ville fjerne.
    const index = newArray.findIndex(
      (element) => element.product._id == itemID
    );

    if (index == -1) {
      //Hvis vi ikke finder et id der passer.

      toast.error("Kunne ikke finde produktet...");
      return;
    }

    if (newArray[index].quantity == 1) {
      //Hvis vi finder et id der passer, og quantity er 1, så bare fjern hele objektet fra arrayen.

      newArray.splice(index, 1);
      toast.success("Sidste af produkt fjernet!");
    } else {
      //Hvis quantity er mere end 1, så put quantity ned med 1.

      newArray[index].quantity--;
      toast.success("Fjernet en af quantity.");
    }

    setCart(newArray);
  };

  const getTotal = () => {
    //Funktion for at finde total pris for alt.

    let total = 0; //Array til at holde på total'et.

    //Loop over alle elementer i cart.
    for (let i = 0; i < cart.length; i++) {
      //Et subtotal for hvert element i arrayen, hvor quantity bliver ganget med pris.
      const subtotal = cart[i].quantity * cart[i].product.price;
      total = total + subtotal; //subtotal bliver så tilføjet til total.
    }

    return total; //Returnere total.
  };

  return { addItem, removeItem, getTotal, cart };
}

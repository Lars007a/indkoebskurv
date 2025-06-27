import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

export function useCart() {
  const [cart, setCart] = useLocalStorage("cart", []);

  const addItem = (itemElement) => {
    //gemt i arrayen som objects, med quantity og product fields.
    //Loop over arrayen, og se om item'en allerede er tilføjet, hvis den er
    //increment quantity field.
    //Hvis ikke, tilføj et helt nyt element med quantity og product fields.

    const index = cart.findIndex((element) => element.id == itemElement.id);
    let newArray = [...cart];

    //Hvis ikke produktet er tilføjet i forvejen, tilføjer vi det med 1 i quantity.
    if (index == -1) {
      newArray.push({ product: itemElement, id: itemElement.id, quantity: 1 });
      toast.success("Produkt tilføjet til kurv!");
    } else {
      //Hvis produktet allerede er tilføjet i forvejen opper vi quantity.
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == itemElement.id) {
          newArray[i].quantity++;
          toast.success("Produkt quantity forhøjet!");
        }
      }
    }

    setCart(newArray);
  };

  const removeItem = (itemID) => {
    let newArray = [...cart];

    const index = newArray.findIndex((element) => element.id == itemID);

    if (index == -1) {
      toast.error("Kunne ikke finde produktet...");
      return;
    }

    if (newArray[index].quantity == 1) {
      newArray.splice(index, 1);
      toast.success("Sidste af produkt fjernet!");
    } else {
      newArray[index].quantity--;
      toast.success("Fjernet en af quantity.");
    }

    setCart(newArray);
  };

  const getTotal = () => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      const subtotal = cart[i].quantity * cart[i].product.price;
      total = total + subtotal;
    }

    return total;
  };

  return { addItem, removeItem, getTotal, cart };
}

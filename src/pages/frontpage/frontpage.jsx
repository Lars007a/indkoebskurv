import ProdCard from "../../comps/prodCard/prodCard.jsx";
import ProductDisplay from "../../comps/productDisplay/productDisplay.jsx";
import TextWithLine from "../../comps/textWithLine/textWithLine.jsx";

export default function frontpage() {
  return (
    <div className="container">
      <TextWithLine text={"Produkter"} />
      <ProductDisplay />
    </div>
  );
}

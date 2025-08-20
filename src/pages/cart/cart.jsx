import CartDisplay from "../../comps/cartDisplay/cartDisplay.jsx";
import TextWithLine from "../../comps/textWithLine/textWithLine.jsx";

export default function cart() {
  return (
    <>
      <div className="container">
        <TextWithLine text={"Kurv"} />
        <CartDisplay />
      </div>
    </>
  );
}

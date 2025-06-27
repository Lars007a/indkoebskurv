import Frontpage from "./pages/frontpage/frontpage.jsx";
import Cart from "./pages/cart/cart.jsx";
import Nav from "./comps/nav/nav.jsx";
import Footer from "./comps/footer/footer.jsx";
import { useRoutes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = useRoutes([
    { element: <Frontpage />, path: "/" },
    { element: <Cart />, path: "/cart" },
  ]);

  return (
    <>
      <Nav />
      {routes}
      <Footer />
      <ToastContainer autoClose={2000} position="top-right" />
    </>
  );
}

export default App;

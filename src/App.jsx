import Frontpage from "./pages/frontpage/frontpage.jsx";
import Cart from "./pages/cart/cart.jsx";
import Nav from "./comps/nav/nav.jsx";
import Footer from "./comps/footer/footer.jsx";
import AddProdPage from "./pages/admin/addProdPage/addProdPage.jsx";
import SeeProdPage from "./pages/admin/seeProdPage/seeProdPage.jsx";
import { useRoutes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = useRoutes([
    { element: <Frontpage />, path: "/" },
    { element: <Cart />, path: "/cart" },
    { element: <AddProdPage />, path: "/admin/addprod" },
    { element: <SeeProdPage />, path: "/admin/seeprod" },
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

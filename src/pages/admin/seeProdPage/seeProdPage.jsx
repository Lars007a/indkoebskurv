import AdminProdsShow from "../../../comps/adminProdsShow/adminProdsShow.jsx";
import AdminNav from "../../../comps/adminNav/adminNav.jsx";
import TextWithLine from "../../../comps/textWithLine/textWithLine.jsx";

export default function admin() {
  return (
    <div className="container">
      <AdminNav />
      <TextWithLine text={"Se produkter"} />
      <AdminProdsShow />
    </div>
  );
}

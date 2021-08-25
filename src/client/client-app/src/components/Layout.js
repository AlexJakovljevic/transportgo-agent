import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;

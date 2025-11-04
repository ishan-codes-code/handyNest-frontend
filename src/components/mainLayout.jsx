import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { AnimatePresence } from "framer-motion";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* <AnimatePresence mode="wait"> */}
      <Outlet />
      {/* </AnimatePresence> */}
      <Footer />
    </>
  );
};

export default MainLayout;

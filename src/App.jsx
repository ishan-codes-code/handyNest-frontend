import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import { useMyContext } from "./context.jsx";
import Home from "./pages/home.jsx";
import Service from "./pages/service.jsx";
import Worker from "./pages/worker.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/scrollToTop.jsx";

function App() {
  const { pinDetails, setPinDetails, availSvc, services, workers } =
    useMyContext();
  const location = useLocation();

  useEffect(() => {
    if (!services || !workers) return;
  });

  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <ScrollToTop />
                <Home />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <h1 className="bold text-blue-600">I am dashboard</h1>
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <ScrollToTop />
                <Service />
              </>
            }
          />
          <Route
            path="/services/:id"
            element={
              <>
                <ScrollToTop />
                <Worker />
              </>
            }
          />
          <Route
            path="/workers"
            element={
              <>
                <ScrollToTop />
                <Worker />
              </>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

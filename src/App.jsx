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
import WorkerLogin from "./pages/workerLogin.jsx";
import LoginPage from "./pages/login.jsx";
import ProfilePage from "./pages/profile.jsx";
import { autoLogin } from "./helper/autoLogin.jsx";
import Register from "./pages/register.jsx";
import VerifyMail from "./pages/verifyMail.jsx";
import MainLayout from "./components/mainLayout.jsx";
import HotToast from "./components/toastSettings.jsx";
import Vector404Page from "./components/404.jsx";

function App() {
  const { services, workers, setUser, globalLoad, setGlobalLoad } =
    useMyContext();
  const location = useLocation();

  const [renderFrame, setRenderFrame] = useState(true);

  useEffect(() => {
    if (!services || !workers) return;
  });

  useEffect(() => {
    autoLogin(setUser, setGlobalLoad);
  }, []);

  const noHeaderFooter = ["/login", "/register", "/verifyMail"];
  useEffect(() =>
    setRenderFrame(!noHeaderFooter.some((p) => p === location.pathname), [
      location.pathname,
    ])
  );

  return (
    <div>
      {globalLoad && (
        <div className="h-screen w-screen fixed top-0 left-0 z-[70] flex items-center justify-center backdrop-blur-md bg-black/10">
          <div className="bg-white/80 backdrop-blur-lg h-28 w-28 flex flex-col items-center justify-center border border-gray-200 rounded-2xl shadow-lg">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-gray-500"></div>
            <p className="mt-3 text-sm text-gray-600 font-medium tracking-wide">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* <Routes location={location} key={location.pathname}>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/verifyMail/:token" element={<VerifyMail />} />
          <Route
            path="/worker/login"
            element={
              <>
                <ScrollToTop />
                <WorkerLogin />
              </>
            }
          />
          <Route path="*" element={<Vector404Page />} />
        </Routes> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ✅ All normal pages share the same layout */}
          <Route element={<MainLayout />}>
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/worker/login" element={<WorkerLogin />} />
          </Route>

          {/* ❌ Pages without Navbar/Footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyMail/:token" element={<VerifyMail />} />
          <Route path="*" element={<Vector404Page />} />
        </Routes>
      </AnimatePresence>

      <HotToast />
    </div>
  );
}

export default App;

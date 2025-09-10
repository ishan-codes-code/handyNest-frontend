import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// utils/scroll.js
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export default ScrollToTop;

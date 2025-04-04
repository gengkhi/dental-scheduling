import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter();
  
  // Use useRef to persist the logoutTimer across renders
  const logoutTimer = useRef(null);

  useEffect(() => {
    setIsMounted(true); 

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token && router.pathname === "/") {
      router.push("/booking");
    }

    const resetTimer = () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
      logoutTimer.current = setTimeout(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
      }, 5 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [router]);

  if (!isMounted) return null;

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} />}
      <Component {...pageProps} />
    </div>
  );
}

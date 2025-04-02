import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Added this state to track mount status
  const router = useRouter();
  let logoutTimer;

  useEffect(() => {
    setIsMounted(true); // Set to true once the component mounts on the client side

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token && router.pathname === "/") {
      router.push("/booking");
    }

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
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
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [router]);

  if (!isMounted) return null;

  return (
    <div>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} />}
      <Component {...pageProps} />
    </div>
  );
}

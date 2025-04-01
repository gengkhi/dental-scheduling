import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set state to true if token exists
  }, []);

  return (
    <div>
      {/* Navbar is visible on all pages */}
      <Navbar isLoggedIn={isLoggedIn} />
      
      <Component {...pageProps} />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Services from "../../components/Services";
import Contact from "../../components/Contact";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAppointmentClick = () => {
    if (isLoggedIn) {
      router.push("/booking");
    } else {
      // Redirect to login page in a new tab if not logged in
      router.push("/login");
    }
  };

  const handleRegisterClick = () => {
    // Redirect to register page in a new tab
    router.push("/register");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col justify-center items-center p-10 text-center"
      >
        <h1 className="text-5xl font-bold mb-4 text-sky-600">Welcome to the Dental Clinic</h1>
        <p className="text-lg mb-6 text-gray-700">Your smile is our priority! Experience top-notch dental care.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600 mb-6">
          <motion.div whileHover={{ scale: 1.1 }}>✔ Teeth Cleaning</motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>✔ Dental Implants</motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>✔ Braces & Aligners</motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>✔ Emergency Care</motion.div>
        </div>
        <motion.img 
          src="/tooth.gif" 
          alt="Dental Clinic" 
          className="max-w-md rounded-lg" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        />
        <motion.button
          onClick={handleAppointmentClick}
          className="mt-6 px-6 py-3 bg-sky-500 text-white rounded-full shadow-md text-lg font-semibold hover:bg-sky-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Schedule an Appointment
        </motion.button>
      </motion.div>
         
      <Services />
      <Contact />
    </div>
  );
}

import { useState } from "react";
import Login from "../../components/Login"; 
import Register from "../../components/Register"; 
import Navbar from "../../components/Navbar";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); 

  const handleToggle = () => {
    setIsLogin(!isLogin); 
  };

  return ( 
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 bg-sky-100 flex justify-center items-center p-10">
        <div className="w-full max-w-md">
          {isLogin ? <Login /> : <Register />} 
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-sky-600">Welcome to the Dental Clinic</h1>
          <p className="text-lg mb-6 text-sky-600">Your smile is our priority!</p>
          <img 
            src="/bean.png" 
            alt="Dental Clinic" 
            className="max-w-md rounded-lg shadow-md" 
          />
        </div>
      </div>

      {/* Buttons to Toggle Login/Register */}
      <div className="absolute bottom-40 left-1/4 transform -translate-x-1/2">
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-sky-500 text-white rounded-full shadow-md"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

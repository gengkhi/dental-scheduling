import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../../components/Login"; 
import Register from "../../components/Register"; 

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAppointmentClick = () => {
    if (isLoggedIn) {
      router.push("/booking"); 
    } else {
      setShowForm(true); 
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full flex flex-col justify-center items-center p-10 bg-white">
        {!showForm ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-sky-600">Welcome to the Dental Clinic</h1>
            <p className="text-lg mb-6 text-sky-600">Your smile is our priority!</p>
            <img src="/tooth.gif" alt="Dental Clinic" className="max-w-md rounded-lg" />
            <div className="mt-6">
              <button
                onClick={handleAppointmentClick}
                className="px-6 py-3 bg-sky-500 text-white rounded-full shadow-md text-lg font-semibold hover:bg-sky-600 transition duration-300"
              >
                Schedule an Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {isLogin ? <Login /> : <Register />}
            <div className="mt-4 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky-600 font-semibold"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

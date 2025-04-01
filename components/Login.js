import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      router.push("/booking"); 
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#4A6C78] w-full max-w-md p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>
        
       
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-white w-full p-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white w-full p-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-sky-600 text-white py-2 rounded-lg font-bold hover:bg-[#66d5cc] transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

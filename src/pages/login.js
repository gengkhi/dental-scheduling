import { useState } from "react";
import API from "../../utils/api";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      
      {/* Clinic Details */}
      <div className="text-center mb-8 max-w-2xl">
        <h2 className="text-4xl font-bold text-sky-600">Welcome to SmileCare Dental</h2>
        <p className="text-lg text-gray-700 mt-2">
          Providing quality dental care to keep your smile bright and healthy.
        </p>
      </div>

      {/* Login Box */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-sky-600 text-center mb-4">Login to Your Account</h3>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold hover:bg-sky-700 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <span 
            className="text-sky-600 font-semibold cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            {" "}Register Here
          </span>
        </p>
      </div>
    </div>
  );
}

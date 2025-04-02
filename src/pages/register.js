import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/auth/register", { name, email, password });
      router.push("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      
      {/* Welcome Text */}
      <div className="text-center mb-8 max-w-2xl">
        <h2 className="text-4xl font-bold text-sky-600">Join SmileCare Today!</h2>
        <p className="text-lg text-gray-700 mt-2">
          Register to book appointments, track your dental health, and access exclusive benefits.
        </p>
      </div>

      {/* Register Box */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-sky-600 text-center mb-4">Create an Account</h3>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold hover:bg-sky-700 transition-all duration-300">
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <span 
            className="text-sky-600 font-semibold cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            {" "}Log In Here
          </span>
        </p>
      </div>
    </div>
  );
}

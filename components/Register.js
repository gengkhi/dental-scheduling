import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", { email, password });
      router.push("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-[#4A6C78] w-full max-w-md p-8 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Register</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-white w-full p-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-sky-600 text-white p-2 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

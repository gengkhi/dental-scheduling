import { useState } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#4A6C78] shadow-lg p-8 rounded-lg w-150">
        <h2 className="text-2xl font-bold text-primary text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-[#77FAF0] text-white py-2 rounded font-bold">Log In</button>
        </form>
      </div>
    </div>
  );
}

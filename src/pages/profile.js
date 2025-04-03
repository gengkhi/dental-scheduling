import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({ name: "", email: "", oldPassword: "", newPassword: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/api/user/get/profile`, {  
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email, oldPassword: "", newPassword: "" });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      // Check if password fields are provided
      if (formData.oldPassword || formData.newPassword) {
        const passwordResponse = await API.put(
          "/api/users/password",
          { oldPassword: formData.oldPassword, newPassword: formData.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(passwordResponse.data.message);
        setFormData({ ...formData, oldPassword: "", newPassword: "" });
        setTimeout(() => {
          window.location.reload();
        }, 1500);  
      }

      const response = await API.put(
        `/api/users/profile`,
        { name: formData.name, email: formData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      toast.error(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 text-center">Profile Management</h2>
        <p className="text-center text-gray-600 mt-2">Update your profile details.</p>
        <div className="flex justify-center my-4">
          <img src="/images/user.png" alt="Profile" className="w-20" />
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

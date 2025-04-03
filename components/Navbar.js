import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa"; // Import an icon from react-icons

export default function Navbar({ isLoggedIn }) {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-3xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Dental Scheduling
        </h1>
        <div className="flex space-x-6">
          {isLoggedIn && (
            <>
              <button
                onClick={() => router.push("/booking")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </button>
              {/* Add Profile Icon Link */}
              <button
                onClick={() => router.push("/profile")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <FaUser className="inline-block text-xl" /> {/* Profile icon */}
              </button>
            </>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

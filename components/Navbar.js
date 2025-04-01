import { useRouter } from "next/router";

export default function Navbar({ isLoggedIn }) {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    router.push("/"); // Redirect to home or login page
  };

  return (
    <div className="bg-sky-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo: always visible */}
        <h1
          className="text-3xl font-bold text-gray-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Dental Clinic
        </h1>
        
        {/* Conditionally render the Sign Out button based on login state */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-800"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-gray-600 hover:text-gray-800"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

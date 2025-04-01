import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;

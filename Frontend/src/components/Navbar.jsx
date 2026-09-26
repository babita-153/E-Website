import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/useAuthContext.jsx";
import { authApi } from "../api/authaxiosApi.jsx";
import { LogOut } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  let api = authApi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, setAccessToken, accessToken } =
    useContext(AuthContext);

  const getMe = async () => {
    try {
      let res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch (error) {
      console.log("error in fetching user", error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const userlogout = async () => {
    try {
      let res = await api.put("/auth/logout");
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.log("error in user logout", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-400 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">E-Commerce</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              end
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Products
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to={"create"}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create
            </NavLink>
            {/* Cart */}
            <button className="relative text-gray-700 hover:text-blue-600">
              🛒
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Login */}
            {user ? (
              <div>
                <h1>{user.name}</h1>
              </div>
            ) : (
              <NavLink
                to={"/login"}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign in
              </NavLink>
            )}
            <LogOut
              onClick={() => {
                console.log("logout");
                userlogout();
              }}
              size={18}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              <a href="/" className="py-2 text-gray-700 hover:text-blue-600">
                Home
              </a>

              <a
                href="/products"
                className="py-2 text-gray-700 hover:text-blue-600"
              >
                Products
              </a>

              <a
                href="/about"
                className="py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </a>

              <button className="text-left py-2 text-gray-700 hover:text-blue-600">
                🛒 Cart
              </button>

              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

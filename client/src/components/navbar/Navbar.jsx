import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChefHat, Menu, Sun, Moon, User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const links = [
    { path: "/", title: "Home" },
    { path: "/allRecipes", title: "All Recipes" },
    { path: "/myRecipes", title: "My Recipes" },
    { path: "/addRecipes", title: "Add Recipes" },
  ];

  const btnBase =
    "px-3 py-1 rounded-md text-sm transition-colors hover:bg-[var(--primary)] hover:text-[var(--accent)]";

  const handleLogin = () => setUser({ name: "Rahman" });
  const handleLogout = () => setUser(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="py-2 flex justify-between items-center mx-2">
      {/* Left: Mobile Menu + Logo */}
      <div className="flex gap-2 items-center">
        {/* Mobile Dropdown */}
        <div className="dropdown dropdown-start md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="p-1 rounded-full bg-[var(--primary)] text-white"
          >
            <Menu size={25} />
          </div>
          <ul className="dropdown-content menu bg-[var(--accent)] rounded-box w-40 shadow-md mt-2 gap-1 p-2 text-[var(--foreground)]">
            {links.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `block px-2 py-1 rounded-md ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--accent)]"
                      : "hover:bg-[var(--primary)] hover:text-[var(--accent)]"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="hidden md:flex bg-[var(--primary)] p-2 rounded-3xl">
            <ChefHat className="text-[var(--accent)]" size={25} />
          </div>
          <h1 className="text-lg font-bold text-[var(--foreground)]">
            Recipe Book
          </h1>
        </NavLink>
      </div>

      {/* Center: Desktop Links */}
      <div className="hidden md:flex gap-2">
        {links.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors text-[var(--foreground)] ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--accent)]"
                  : "hover:bg-[var(--primary)] hover:text-[var(--accent)]"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      {/* Right: Theme + Auth Buttons */}
      <div className="flex gap-2 items-center">
        {/* Theme Toggle using Lucide icons */}
        <button
          onClick={toggleTheme}
          className=" btn-circle p-2 bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-colors"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Auth Buttons */}
        {!user ? (
          <div className="flex gap-2">
            <button
              onClick={handleLogin}
              className={`${btnBase} border border-[var(--foreground)]`}
            >
              Login
            </button>
            <button className={`${btnBase} bg-[var(--primary)] text-black`}>
              Register
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className={`${btnBase} bg-[var(--primary)] text-black`}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

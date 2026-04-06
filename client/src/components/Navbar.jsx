import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const baseLinks = [{ title: "Home", path: "/" }];

  const authLinks = user
    ? [
        { title: "My Applications", path: "/myApplications" },
        { title: "Add Job", path: "/addJob" },
        { title: "Posted Jobs", path: "/myPostedJobs" },
      ]
    : [];

  const links = [...baseLinks, ...authLinks];

  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleRegister = () => {
    navigate("/auth/register");
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        alert("User logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm max-w-6xl mx-auto ">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="btn btn-ghost text-xl">
          CareerCode
        </Link>
      </div>

      {/* CENTER (DESKTOP MENU) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link className="btn btn-link btn-ghost" to={link.path}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center justify-end min-h-[40px]">
        {loading ? (
          <div className="flex items-center justify-center w-20">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : user ? (
          <button onClick={handleLogout} className="btn btn-error">
            Log Out
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
            <button onClick={handleRegister} className="btn btn-info">
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";    // for icons of logo 
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand"id="logo">
            <FaShoppingCart/>   
            </Link>
            <Link to="/" className="navbar-brand" id="brandname">
               ZL-Classic
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "black",
                    transition: "color 0.3s ease",
                  }}
                >
                  Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    padding: "10px",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/categories"}
                      style={{
                        fontSize: "16px",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        color:"black",
                        transition: "background 0.3s ease, transform 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.color = "#fff";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "black";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      📂 All Categories
                    </Link>
                  </li>
                  <hr style={{ margin: "5px 0", borderTop: "1px solid #ddd" }} />
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{
                          fontSize: "16px",
                          padding: "10px 15px",
                          borderRadius: "5px",
                          transition: "background 0.3s ease, transform 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#007bff";
                          e.target.style.color = "#fff";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "black";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🏷️ {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>


              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

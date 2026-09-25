import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiArrowRight,
  FiLogOut,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("vk_token")
  );

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("vk_token"));
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    setSearchOpen(false);

    window.location.href = `/shop?search=${encodeURIComponent(
      search.trim()
    )}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("vk_token");
    localStorage.removeItem("vk_user");

    setIsLoggedIn(false);
    closeMenu();

    alert("Logged out successfully!");

    navigate("/");
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      } ${menuOpen ? "navbar-menu-open" : ""}`}
    >
      <div className="navbar-inner">

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-mark">VK</span>

          <span className="logo-text">
            <strong>FASHIONS</strong>
            <small>EST. 2026</small>
          </span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={closeMenu}>
            Shop
          </NavLink>

          <a href="/#categories" onClick={closeMenu}>
            Collections
          </a>

          <a href="/#trending" onClick={closeMenu}>
            Trending
          </a>
        </nav>

        <div className="navbar-actions">

          <button
            className={`navbar-action search-button ${
              searchOpen ? "active" : ""
            }`}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          <Link
            to="/wishlist"
            className="navbar-action"
            aria-label="Wishlist"
          >
            <FiHeart />

            {wishlistCount > 0 && (
              <span className="navbar-badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="navbar-action"
            aria-label="Shopping bag"
          >
            <FiShoppingBag />

            {cartCount > 0 && (
              <span className="navbar-badge">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={isLoggedIn ? "/account" : "/login"}
            className="navbar-action account-button"
            aria-label={isLoggedIn ? "Account" : "Login"}
          >
            <FiUser />
          </Link>

          <button
            className="navbar-mobile-toggle mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`search-panel ${
          searchOpen ? "search-panel-open" : ""
        }`}
      >
        <form
          className="search-form"
          onSubmit={handleSearchSubmit}
        >
          <FiSearch />

          <input
            type="text"
            placeholder="Search dresses, shirts, jackets..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            autoFocus={searchOpen}
          />

          <button type="submit">
            Search
            <FiArrowRight />
          </button>
        </form>

        <div className="search-suggestions">
          <span>Popular:</span>

          <Link
            to="/shop?category=men"
            onClick={() => setSearchOpen(false)}
          >
            Men's Wear
          </Link>

          <Link
            to="/shop?category=women"
            onClick={() => setSearchOpen(false)}
          >
            Women's Wear
          </Link>

          <Link
            to="/shop?category=new"
            onClick={() => setSearchOpen(false)}
          >
            New Arrivals
          </Link>

          <Link
            to="/shop?category=trending"
            onClick={() => setSearchOpen(false)}
          >
            Trending
          </Link>
        </div>
      </div>

      <div
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation-open" : ""
        }`}
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/shop" onClick={closeMenu}>
          Shop
        </NavLink>

        <a href="/#categories" onClick={closeMenu}>
          Collections
        </a>

        <a href="/#trending" onClick={closeMenu}>
          Trending
        </a>

        {isLoggedIn ? (
          <>
            <Link to="/account" onClick={closeMenu}>
              My Account
            </Link>

            <button
              className="mobile-logout-button"
              onClick={handleLogout}
            >
              <FiLogOut />
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
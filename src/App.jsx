import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Wishlist from "./pages/Wishlist";
import Hero from "./sections/Hero";
import CategorySection from "./sections/CategorySection";
import TrendingProducts from "./sections/TrendingProducts";

import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <TrendingProducts />
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>

            {/* =========================
                AUTHENTICATION
            ========================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/account"
              element={<Account />}
             />

            {/* =========================
                PROTECTED PAGES
            ========================= */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-success/:id"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            {/* =========================
                UNKNOWN URL
            ========================= */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
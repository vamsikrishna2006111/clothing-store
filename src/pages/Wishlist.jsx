import React from "react";
import { FiHeart, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "160px 20px",
          textAlign: "center",
        }}
      >
        <FiHeart size={60} />

        <h1>Your Wishlist Is Empty</h1>

        <p>
          Save your favorite products here.
        </p>

        <button
          onClick={() => navigate("/shop")}
          style={buttonStyle}
        >
          EXPLORE PRODUCTS
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "140px 6% 70px",
      }}
    >
      <h1>My Wishlist</h1>

      <p>
        {wishlist.length}{" "}
        {wishlist.length === 1
          ? "product"
          : "products"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "30px",
          marginTop: "35px",
        }}
      >
        {wishlist.map((product) => {
          const image =
            product.images &&
            product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/500x600?text=VK+FASHIONS";

          return (
            <article
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                position: "relative",
              }}
            >
              <img
                src={image}
                alt={product.name}
                onClick={() =>
                  navigate(
                    `/product/${product._id}`
                  )
                }
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />

              <button
                onClick={() =>
                  removeFromWishlist(
                    product._id
                  )
                }
                type="button"
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "25px",
                  border: "none",
                  background: "white",
                  padding: "10px",
                  cursor: "pointer",
                }}
                aria-label="Remove from wishlist"
              >
                <FiTrash2 />
              </button>

              <p
                style={{
                  marginTop: "15px",
                  fontSize: "13px",
                }}
              >
                {product.brand}
              </p>

              <h3>{product.name}</h3>

              <strong>
                ₹
                {Number(
                  product.price
                ).toLocaleString("en-IN")}
              </strong>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    navigate(
                      `/product/${product._id}`
                    )
                  }
                  style={{
                    ...buttonStyle,
                    flex: 1,
                  }}
                >
                  VIEW
                </button>

                <button
                  onClick={() =>
                    handleAddToCart(product)
                  }
                  style={{
                    ...buttonStyle,
                    flex: 1,
                  }}
                >
                  <FiShoppingBag />
                  CART
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: "13px 22px",
  marginTop: "20px",
  background: "#111",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Wishlist;
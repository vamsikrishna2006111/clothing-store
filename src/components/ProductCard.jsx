import React from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiEye,
  FiCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "./../styles/ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    addToCart,
    cartItems,
  } = useCart();

  const {
    wishlist,
    toggleWishlist,
  } = useWishlist();

  const alreadyInCart = cartItems.some(
    (item) => item._id === product._id
  );

  const wishlisted = wishlist.some(
    (item) => item._id === product._id
  );

  const image =
    product.images &&
    product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/500x600?text=VK+FASHIONS";

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-wrapper">

        <img
          src={image}
          alt={product.name}
          className="product-image"
        />

        {product.discount > 0 && (
          <span className="product-discount">
            -{product.discount}%
          </span>
        )}

        {/* WISHLIST */}
        <button
          className={`wishlist-button ${
            wishlisted ? "wishlist-active" : ""
          }`}
          onClick={handleWishlist}
          type="button"
          aria-label="Add to wishlist"
        >
          <FiHeart
            fill={
              wishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <div className="product-hover-actions">

          {/* VIEW DETAILS */}
          <button
            onClick={handleViewDetails}
            type="button"
          >
            <FiEye />
            <span>View Details</span>
          </button>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            type="button"
            className={
              alreadyInCart
                ? "added-to-cart"
                : ""
            }
          >
            {alreadyInCart ? (
              <FiCheck />
            ) : (
              <FiShoppingBag />
            )}

            <span>
              {alreadyInCart
                ? "In Cart"
                : "Add to Cart"}
            </span>
          </button>

        </div>
      </div>

      <div className="product-info">

        <p className="product-brand">
          {product.brand}
        </p>

        <h3>{product.name}</h3>

        <div className="product-rating">
          <span>★</span>

          <span>
            {product.rating || 0}
          </span>

          <small>
            ({product.reviewsCount || 0})
          </small>
        </div>

        <div className="product-price">

          <strong>
            ₹
            {Number(product.price).toLocaleString(
              "en-IN"
            )}
          </strong>

          {product.oldPrice && (
            <del>
              ₹
              {Number(
                product.oldPrice
              ).toLocaleString("en-IN")}
            </del>
          )}

        </div>

      </div>
    </motion.article>
  );
}

export default ProductCard;
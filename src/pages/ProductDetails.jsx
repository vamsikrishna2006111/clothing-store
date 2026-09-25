import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "160px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "160px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2>{error || "Product not found"}</h2>

        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            cursor: "pointer",
          }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 6% 60px",
        color: "white",
      }}
    >
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "16px",
          marginBottom: "30px",
        }}
      >
        <FiArrowLeft />
        Back
      </button>

      {/* Product */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
        }}
      >
        {/* Image */}

        <div>
          <img
            src={product.images?.[0]}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "650px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Information */}

        <div>
          <p
            style={{
              letterSpacing: "2px",
              color: "#aaa",
              textTransform: "uppercase",
            }}
          >
            {product.brand}
          </p>

          <h1
            style={{
              fontSize: "42px",
              margin: "15px 0",
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}

          <div style={{ marginBottom: "20px" }}>
            ⭐ {product.rating}{" "}
            <span style={{ color: "#aaa" }}>
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}

          <div style={{ marginBottom: "25px" }}>
            <strong style={{ fontSize: "30px" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </strong>

            {product.oldPrice && (
              <del
                style={{
                  marginLeft: "15px",
                  color: "#888",
                  fontSize: "18px",
                }}
              >
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </del>
            )}

            {product.discount > 0 && (
              <span
                style={{
                  marginLeft: "15px",
                  color: "#ff6b6b",
                }}
              >
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Description */}

          <p
            style={{
              color: "#ccc",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            {product.description}
          </p>

          {/* Sizes */}

          <h3>Available Sizes</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              margin: "15px 0 25px",
            }}
          >
            {product.sizes?.map((size) => (
              <button
                key={size}
                style={{
                  padding: "10px 18px",
                  background: "transparent",
                  color: "white",
                  border: "1px solid #555",
                  cursor: "pointer",
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Colors */}

          <h3>Color</h3>

          <p style={{ color: "#ccc" }}>
            {product.colors?.join(", ")}
          </p>

          {/* Stock */}

          <p
            style={{
              marginTop: "20px",
              color: product.stock > 0 ? "#8fd694" : "#ff6b6b",
            }}
          >
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </p>

          {/* Quantity */}

          <h3 style={{ marginTop: "25px" }}>
            Quantity
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "15px 0 25px",
            }}
          >
            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              −
            </button>

            <span style={{ fontSize: "18px" }}>
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity((q) =>
                  Math.min(product.stock, q + 1)
                )
              }
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* Add To Cart */}

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            style={{
              width: "100%",
              padding: "17px",
              border: "none",
              background:
                product.stock <= 0
                  ? "#555"
                  : added
                  ? "#2e7d32"
                  : "white",
              color:
                product.stock <= 0 || added
                  ? "white"
                  : "black",
              cursor:
                product.stock <= 0
                  ? "not-allowed"
                  : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}

            {!added && <FiShoppingBag />}
          </button>

          {/* View Cart */}

          {added && (
            <button
              onClick={() => navigate("/cart")}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                background: "transparent",
                color: "white",
                border: "1px solid #555",
                cursor: "pointer",
              }}
            >
              View Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
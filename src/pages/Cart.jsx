import React from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "150px 6%",
          textAlign: "center",
        }}
      >
        <h1>Your Cart is Empty</h1>

        <p style={{ color: "#777", marginTop: "10px" }}>
          Add some products to your cart.
        </p>

        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "25px",
            padding: "14px 30px",
            border: "none",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          CONTINUE SHOPPING
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
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <div>
          <h1>Shopping Cart</h1>

          <p style={{ color: "#777" }}>
            {cartItems.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            item(s)
          </p>
        </div>

        <button
          onClick={clearCart}
          style={{
            border: "none",
            background: "transparent",
            color: "#c0392b",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          CLEAR CART
        </button>
      </div>

      {/* CART CONTENT */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* CART ITEMS */}

        <div>
          {cartItems.map((item) => {
            const image =
              item.images && item.images.length > 0
                ? item.images[0]
                : "https://via.placeholder.com/300x400?text=VK+FASHIONS";

            return (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {/* PRODUCT IMAGE */}

                <img
                  src={image}
                  alt={item.name}
                  style={{
                    width: "130px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />

                {/* PRODUCT DETAILS */}

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <small
                    style={{
                      color: "#777",
                    }}
                  >
                    {item.brand}
                  </small>

                  <h3
                    style={{
                      margin: "8px 0",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p>
                    ₹
                    {Number(item.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {/* QUANTITY */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      style={{
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <FiMinus />
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      style={{
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <FiPlus />
                    </button>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                      title="Remove product"
                      style={{
                        marginLeft: "15px",
                        border: "none",
                        background: "transparent",
                        color: "#c0392b",
                        cursor: "pointer",
                      }}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  {/* ITEM TOTAL */}

                  <p
                    style={{
                      marginTop: "12px",
                      color: "#555",
                    }}
                  >
                    Item Total: ₹
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ORDER SUMMARY */}

        <div
          style={{
            border: "1px solid #ddd",
            padding: "25px",
            height: "fit-content",
          }}
        >
          <h2>Order Summary</h2>

          {/* SUBTOTAL */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25px",
            }}
          >
            <span>Subtotal</span>

            <strong>
              ₹{cartTotal.toLocaleString("en-IN")}
            </strong>
          </div>

          {/* SHIPPING */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <span>Shipping</span>

            <span
              style={{
                color: "green",
              }}
            >
              FREE
            </span>
          </div>

          <hr
            style={{
              margin: "20px 0",
            }}
          />

          {/* TOTAL */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <strong>Total</strong>

            <strong>
              ₹{cartTotal.toLocaleString("en-IN")}
            </strong>
          </div>

          {/* CHECKOUT */}

          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "25px",
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            PROCEED TO CHECKOUT
          </button>

          {/* CONTINUE SHOPPING */}

          <button
            onClick={() => navigate("/shop")}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "12px",
              background: "#fff",
              border: "1px solid #111",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <FiArrowLeft />
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
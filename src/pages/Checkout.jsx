import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        image: item.images?.[0] || "",
        price: Number(item.price),
        quantity: item.quantity,
      }));

      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },

        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        items: orderItems,

        totalAmount: cartTotal,

        paymentMethod,
      };

      console.log("Sending order:", orderData);

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      console.log("Order created:", response.data);

      clearCart();

      navigate(
        `/order-success/${response.data.order._id}`
      );
    } catch (error) {
      console.error("Place order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "160px 6%",
          textAlign: "center",
        }}
      >
        <h1>Your Cart is Empty</h1>

        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "20px",
            padding: "14px 30px",
            background: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          GO TO SHOP
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
      <h1>Checkout</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "40px",
          marginTop: "35px",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}

        <form onSubmit={handleSubmit}>
          {/* CUSTOMER */}

          <section
            style={{
              border: "1px solid #ddd",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2>Customer Details</h2>

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </section>

          {/* SHIPPING ADDRESS */}

          <section
            style={{
              border: "1px solid #ddd",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2>Delivery Address</h2>

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                height: "100px",
                resize: "vertical",
              }}
            />

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="pincode"
              placeholder="PIN Code"
              value={formData.pincode}
              onChange={handleChange}
              required
              maxLength="6"
              style={inputStyle}
            />
          </section>

          {/* PAYMENT */}

          <section
            style={{
              border: "1px solid #ddd",
              padding: "25px",
            }}
          >
            <h2>Payment Method</h2>

            <label
              style={{
                display: "block",
                padding: "18px",
                marginTop: "20px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <strong style={{ marginLeft: "10px" }}>
                Cash on Delivery
              </strong>

              <p
                style={{
                  marginLeft: "25px",
                  color: "#777",
                  marginBottom: 0,
                }}
              >
                Pay when your order is delivered.
              </p>
            </label>

            <label
              style={{
                display: "block",
                padding: "18px",
                marginTop: "12px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Online Payment"
                checked={
                  paymentMethod === "Online Payment"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <strong style={{ marginLeft: "10px" }}>
                Online Payment
              </strong>

              <p
                style={{
                  marginLeft: "25px",
                  color: "#777",
                  marginBottom: 0,
                }}
              >
                UPI, Cards, Net Banking & Wallets
              </p>
            </label>
          </section>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "16px",
              background: "#111",
              color: "#fff",
              border: "none",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontWeight: "bold",
            }}
          >
            {loading
              ? "PROCESSING..."
              : paymentMethod === "Cash on Delivery"
              ? "PLACE ORDER"
              : "CONTINUE TO PAYMENT"}
          </button>
        </form>

        {/* ORDER SUMMARY */}

        <aside
          style={{
            border: "1px solid #ddd",
            padding: "25px",
            height: "fit-content",
            position: "sticky",
            top: "100px",
          }}
        >
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹
                {(
                  Number(item.price) *
                  item.quantity
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <hr style={{ margin: "20px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Shipping</span>

            <span style={{ color: "green" }}>
              FREE
            </span>
          </div>

          <hr style={{ margin: "20px 0" }} />

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
        </aside>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "15px",
};

export default Checkout;
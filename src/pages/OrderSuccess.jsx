import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${id}`
        );

        setOrder(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "160px 6%",
          textAlign: "center",
        }}
      >
        <h2>Loading order...</h2>
      </main>
    );
  }

  if (!order) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "160px 6%",
          textAlign: "center",
        }}
      >
        <h1>Order Not Found</h1>

        <button onClick={() => navigate("/shop")}>
          Go To Shop
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "150px 6%",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "auto",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with VK FASHIONS.
        </p>

        <p>
          Order ID:
          <strong> {order._id}</strong>
        </p>

        <p>
          Status:
          <strong> {order.status}</strong>
        </p>

        <h2>
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </h2>

        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "25px",
            padding: "15px 35px",
            background: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </main>
  );
}

export default OrderSuccess;
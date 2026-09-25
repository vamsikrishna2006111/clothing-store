import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiLock,
  FiLogOut,
} from "react-icons/fi";

function Account() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("vk_user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("vk_token");
    localStorage.removeItem("vk_user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  if (!user) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "160px 20px",
          textAlign: "center",
        }}
      >
        <h1>Please Login</h1>

        <p>
          Login to access your VK Fashions account.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "14px 30px",
            background: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          LOGIN
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "140px 6% 70px",
        background: "#f8f8f8",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>My Account</h1>

        <p
          style={{
            color: "#777",
            marginTop: "8px",
          }}
        >
          Welcome back, {user.name}
        </p>

        {/* PROFILE */}
        <section
          style={{
            background: "#fff",
            padding: "30px",
            marginTop: "35px",
            border: "1px solid #e5e5e5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <FiUser size={28} />

            <div>
              <h2 style={{ margin: 0 }}>
                {user.name}
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#777",
                }}
              >
                {user.email}
              </p>
            </div>
          </div>
        </section>

        {/* ACCOUNT OPTIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => navigate("/orders")}
            style={cardStyle}
          >
            <FiPackage size={25} />

            <strong>My Orders</strong>

            <span>
              View your orders
            </span>
          </button>

          <button
            onClick={() => navigate("/change-password")}
            style={cardStyle}
          >
            <FiLock size={25} />

            <strong>Change Password</strong>

            <span>
              Update your password
            </span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              ...cardStyle,
              color: "#b00020",
            }}
          >
            <FiLogOut size={25} />

            <strong>Logout</strong>

            <span>
              Sign out of your account
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e5e5",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  cursor: "pointer",
  textAlign: "left",
};

export default Account;

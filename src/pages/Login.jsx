import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        form
      );

      // Save JWT token
      localStorage.setItem(
        "vk_token",
        response.data.token
      );

      // Save logged-in user
      localStorage.setItem(
        "vk_user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "150px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
      >
        <h1>Welcome Back</h1>

        <p style={{ color: "#777" }}>
          Login to your VK Fashions account
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        <p style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  border: "none",
  borderRadius: "4px",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;
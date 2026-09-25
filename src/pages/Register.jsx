import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
  "http://localhost:5000/api/users/register",
  form
);

localStorage.setItem(
  "vk_user",
  JSON.stringify(response.data.user)
);

localStorage.setItem(
  "vk_token",
  response.data.token
);

alert("Registration successful!");

navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
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
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
      >
        <h1>Create Account</h1>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
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
          style={buttonStyle}
        >
          {loading
            ? "CREATING..."
            : "CREATE ACCOUNT"}
        </button>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
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
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

export default Register;
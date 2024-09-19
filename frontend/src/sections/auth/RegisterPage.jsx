import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styling/AuthPages.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch(
        "https://project-final-auth-api.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration response:", data);

      if (response.status === 201) {
        const { token } = data;
        if (token) {
          login(token);
          navigate("/rentals");
        }
      } else {
        setError("Registration failed. Please try again");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2 className="authTitle">Register</h2>
        {error && <p className="authError">{error}</p>}
        <label className="authLabel">
          Username:
          <input
            type="text"
            required
            className="authInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="authLabel">
          Email:
          <input
            type="email"
            required
            className="authInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="authLabel">
          Password:
          <input
            type="password"
            required
            className="authInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="authButtonWrapper">
          <button type="submit" className="authButton">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

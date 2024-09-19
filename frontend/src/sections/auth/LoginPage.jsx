import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import "./styling/authPages.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      response = await fetch(
        "https://project-final-auth-api.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Login response status:", response.status);

      const data = await response.json();
      console.log("Login successfull", data);

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = data;
      if (token) {
        login(token);
        navigate("/rentals");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2 className="authTitle">Sign in</h2>
        {error && <p className="authError">{error}</p>}
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
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

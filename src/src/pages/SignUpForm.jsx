import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, type, id, name, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      autoComplete="off" // Ngăn trình duyệt tự động điền
      className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Footer = ({ isSignUp, toggleForm }) => (
  <div className="mt-4 text-center">
    <button
      onClick={toggleForm}
      className="text-sm text-blue-500 hover:underline"
    >
      {isSignUp
        ? "Already have an account? Sign in"
        : "Don't have an account? Sign up"}
    </button>
  </div>
);

const SignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (isSignUp) {
      const userData = {
        fullname: fullName,
        email: email,
        password: password,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Registration successful!");
      setIsSignUp(false);
      setFullName("");
      setEmail("");
      setPassword("");
    } else {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUserData &&
        storedUserData.email === email &&
        storedUserData.password === password
      ) {
        navigate("/dashboard");
      } else {
        alert("Incorrect login information. Please try again.");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20210907/pngtree-wall-rock-texture-grain-dark-gray-background-image_780289.jpg')",
      }}
    >
      <div className="max-w-md w-full p-6 bg-gray-200 rounded-lg shadow-lg relative z-10">
        <div className="flex justify-center gap-8 mb-6">
          <h2
            onClick={() => setIsSignUp(true)}
            className={`cursor-pointer text-2xl font-semibold ${
              isSignUp ? "text-blue-500" : "text-gray-500"
            } hover:underline`}
          >
            Sign Up
          </h2>
          <h2
            onClick={() => setIsSignUp(false)}
            className={`cursor-pointer text-2xl font-semibold ${
              !isSignUp ? "text-blue-500" : "text-gray-500"
            } hover:underline`}
          >
            Sign In
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <InputField
              label="FullName"
              type="text"
              id="fullname"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
          />

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>

        <Footer isSignUp={isSignUp} toggleForm={toggleForm} />
      </div>
    </div>
  );
};

export default SignUpForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: location.pathname });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div style={styles.container}>
      <h1 style={styles.text}>redirecting you in {count} seconds...</h1>
      <div style={styles.spinner}></div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Adding Keyframe Animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);

export default Spinner;

import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div style={styles.container}>
        <h2 style={styles.title}>Browse Categories</h2>
        <div style={styles.grid}>
          {categories.map((c) => (
            <div key={c._id} style={styles.cardContainer}>
              <div style={styles.card}>
                <Link to={`/category/${c.slug}`} style={styles.link}>
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    marginTop: "100px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "300px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  link: {
    display: "block",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },
};

// Hover effect for cards
styles.card[":hover"] = {
  transform: "scale(1.05)",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
};

// Hover effect for buttons
styles.link[":hover"] = {
  backgroundColor: "#0056b3",
};

export default Categories;

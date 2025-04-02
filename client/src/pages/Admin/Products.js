import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { hover } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product"); //make api request to fetch all products
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts(); 
  }, []);

  return (
    <Layout title="Dashboard - All Products">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.productsContent}>
          <h1 style={styles.header}>All Products List</h1>
          <div style={styles.productGrid}>
            {products.map((product) => (                           //loop to fetch all products 
              <Link                                                //link tage isliye so that kahi bhi click kare toh to wale par redirect kare 
                key={product._id}
                to={`/dashboard/admin/product/${product.slug}`}    // ye sirf frontend ke liye /get-product/ iska istemal nhi kiye , backend me vo daalna jaurui hai jo updateProduct.js me kiya hai 
                style={styles.productLink}
              >
                <div style={styles.productCard}>
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <div style={styles.cardBody}>
                    <div style={styles.cardNamePrice}>
                      <h5 style={styles.productName}>{product.name}</h5>
                      <p style={styles.productPrice}>${product.price}</p>
                    </div>
                    <p style={styles.productDescription}>{product.description}</p>
                    <button style={styles.productButton}>View Details</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styling adjusted as per the provided CSS snippet
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "90vh",
  },
  adminMenuWrapper: {
    flex: "1 1 200px",
    marginTop: "100px",
    marginLeft: "35px",
    marginBottom: "20px",
    marginRight: "20px",
  },
  productsContent: {
    flex: "3 1 600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#007bff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  productGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  productLink: {
    textDecoration: "none",
    color: "inherit",
  },
  productCard: {
    backgroundColor: "rgba(128, 128, 128, 0.097)",
    width: "18rem",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s",
    border: "1px solid #ddd",
  },
  productImage: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    marginBottom: "10px",
    transition: "transform 0.3s",
  },
  productImageHover: {
    transform: "scale(0.9)",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  cardNamePrice: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px",
  },
  productName: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    color: "green",
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: "0.9rem",
    color: "rgb(90, 89, 89)",
    marginBottom: "10px",
  },
  productButton: {
    borderRadius: "0",
    width: "100%",
    borderTopLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Adding hover effect to the image
styles.productCard[':hover'] = {
  ...styles.productCard,
  transform: "scale(1.05)",
};

styles.productImage[':hover'] = styles.productImageHover;

export default Products;

import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - Admin Panel">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.dashboardContent}>
          <div style={styles.dashboardCard}>
            <h2 style={styles.header}>Admin Dashboard</h2>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>Admin Name:</strong> {auth?.user?.name}
              </p>
              <p style={styles.infoText}>
                <strong>Admin Email:</strong> {auth?.user?.email}
              </p>
              <p style={styles.infoText}>
                <strong>Admin Contact:</strong> {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styling
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
  dashboardContent: {
    flex: "3 1 600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardCard: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: "2px solid #007bff",
    marginTop: "50px",
    marginBottom: "20px",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#007bff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  infoBox: {
    backgroundColor: "#f0f8ff",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px",
    border: "1px solid #007bff",
  },
  infoText: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "500",
  },
};

export default AdminDashboard;

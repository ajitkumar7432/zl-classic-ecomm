import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - User Panel">
      <div style={styles.container}>
        <div style={styles.menuWrapper}>
          <UserMenu />
        </div>
        <div style={styles.dashboardContent}>
          <div style={styles.dashboardCard}>
            <h2 style={styles.header}>User Dashboard</h2>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>User Name:</strong> {auth?.user?.name}
              </p>
              <p style={styles.infoText}>
                <strong>User Email:</strong> {auth?.user?.email}
              </p>
              <p style={styles.infoText}>
                <strong>User Address:</strong> {auth?.user?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Using the same styles for consistency
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "90vh",
  },
  menuWrapper: {
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

export default UserDashboard;

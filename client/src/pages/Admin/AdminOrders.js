import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Update order status
  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: value } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <Layout title="Dashboard - Manage Orders">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.ordersContent}>
          <div style={styles.ordersBox}>
            <h1 style={styles.header}>Manage Orders</h1>

            {loading ? (
              <p style={styles.loadingText}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={styles.noOrdersText}>No orders available.</p>
            ) : (
              <div style={styles.orderList}>
                {orders.map((order, index) => (
                  <div style={styles.orderContainer} key={order._id}>
                    <div style={styles.tableWrapper}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.tableHeader}>#</th>
                            <th style={styles.tableHeader}>Status</th>
                            <th style={styles.tableHeader}>Buyer</th>
                            <th style={styles.tableHeader}>Date</th>
                            <th style={styles.tableHeader}>Payment</th>
                            <th style={styles.tableHeader}>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={styles.tableCell}>{index + 1}</td>
                            <td style={styles.tableCell}>
                              <Select
                                bordered={false}
                                value={order.status}
                                onChange={(value) => handleChange(order._id, value)}
                              >
                                {statusOptions.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td style={styles.tableCell}>{order?.buyer?.name}</td>
                            <td style={styles.tableCell}>{moment(order?.createdAt).fromNow()}</td>
                            <td style={styles.tableCell}>
                              {order?.payment?.success ? "Success" : "Failed"}
                            </td>
                            <td style={styles.tableCell}>{order?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={styles.productContainer}>
                      {order?.products?.map((product) => (
                        <div style={styles.productCard} key={product._id}>
                          <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            loading="lazy"
                            style={styles.productImage}
                          />
                          <div style={styles.productDetails}>
                            <p style={styles.productName}>{product.name}</p>
                            <p style={styles.productDesc}>
                              {product.description.substring(0, 30)}...
                            </p>
                            <p style={styles.productPrice}>Price: ₹{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styling for the component
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
    marginRight: "20px",
  },
  ordersContent: {
    flex: "3 1 600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ordersBox: {
    width: "100%",
    maxWidth: "650px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    marginTop: "50px",
    border: "3px solid blue",
  },
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#007bff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
  },
  noOrdersText: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.2rem",
  },
  orderList: {
    overflowY: "auto",
    maxHeight: "420px",
  },
  orderContainer: {
    marginBottom: "20px",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid blue",
    backgroundColor: "#f9f9f9",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "1px solid #ccc",
    textAlign: "center",
    fontSize: "1rem",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  productCard: {
    width: "180px",
    margin: "10px",
    padding: "10px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  productImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    marginBottom: "10px",
  },
};

export default AdminOrders;

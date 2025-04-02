import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select,Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);   //makes api request to backend
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");      //Makes an API request to /api/v1/category/get-category (backend).Retrieves category data from the database.
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  // Delete product
  const handleDelete = async () => {
    // const confirmDelete = window.prompt("Are you sure you want to delete this product?");
    // if (!confirmDelete) return;  iske jagah antd ke modal ke istemal se pop up kiya hu deletion confirmation ka

    try {
      const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
    setShowModal(false);
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.productContent}>
          <div style={styles.productBox}>
            <h1 style={styles.header}>Update Product</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              style={styles.select}
              onChange={(value) => setCategory(value)}
              value={category}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div style={styles.inputGroup}>
              <label style={styles.fileLabel}>
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {photo && (
              <div style={styles.imagePreview}>
                <img src={URL.createObjectURL(photo)} alt="Preview" height="200px" />
              </div>
            )}

            <input
              type="text"
              value={name}
              placeholder="Product Name"
              style={styles.input}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              value={description}
              placeholder="Product Description"
              style={{ ...styles.input, height: "80px" }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              value={price}
              placeholder="Product Price"
              style={styles.input}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              value={quantity}
              placeholder="Quantity"
              style={styles.input}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div style={styles.buttonContainer}>
              <button style={styles.updateButton} onClick={handleUpdate}>
                Update Product
              </button>
              <button style={styles.deleteButton} onClick={() => setShowModal(true)}>
                Delete Product
              </button>
              {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete <b>{name}</b>?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={() => setShowModal(false)}>
                          Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "90vh",
  },
  adminMenuWrapper: {
    flex: "1 1 200px",
    margin: "20px",
  },
  productContent: {
    flex: "3 1 600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productBox: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    marginTop: "50px",
    border: "2px solid #007bff",
  },
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    color: "#007bff",
    textAlign: "center",
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  fileLabel: {
    display: "block",
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px",
    textAlign: "center",
    borderRadius: "4px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
};


export default UpdateProduct;

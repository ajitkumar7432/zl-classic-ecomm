import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";  //for category selection in dropdown
import { useNavigate } from "react-router-dom";
const { Option } = Select;  

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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

  // Create a new product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/product/create-product",       //Makes an HTTP POST request  fills the form data 
        productData    
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.productContent}>
          <div style={styles.productBox}>
            <h1 style={styles.header}>Create Product</h1>
            <form onSubmit={handleCreate} style={styles.form}>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}   //on slecteing category update the setcategory
                style={styles.select}
              >
                {categories.map((c) => (          //loop ke jaise kaam karega saare categories print karane me
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col md-12" id="imagePreview">
                  {photo? photo.name : "Upload Photo"}
                  <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}  //files ko array ke type me ete aur 1st image ko select
                  hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-centre">
                    <img src={URL.createObjectURL(photo)} //creates temporary url of the selected image
                    alt="Product_Photo" 
                    height={'200px'}
                    className="img img-responsive"
                    />
                    </div>
                )}
              </div>
              
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
              <textarea
                value={description}
                placeholder="Product Description"
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
              />
              <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                style={styles.input}
              />
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                onChange={(value) => setShipping(value)}
                style={styles.select}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <button type="submit" style={styles.submitButton}>
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Responsive Styling
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
  productContent: {
    flex: "3 1 600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productBox: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: "2px solid #007bff",
    marginTop: "50px",
    marginBottom: "20px",
  },
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#007bff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    minHeight: "100px",
    resize: "none",
    outline: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  select: {
    marginBottom: "15px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  previewImage: {
    marginBottom: "15px",
    maxHeight: "200px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
    borderRadius: "8px",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  "@media (max-width: 768px)": {
    productBox: {
      width: "95%",
      margin: "0 auto",
    },
    header: {
      fontSize: "1.5rem",
    },
    input: {
      fontSize: "0.9rem",
    },
    submitButton: {
      fontSize: "0.9rem",
    },
  },
};

export default CreateProduct;

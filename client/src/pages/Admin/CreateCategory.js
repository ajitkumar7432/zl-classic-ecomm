import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";  //for popup of edit button 

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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

  // Add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} added successfully`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  // Update a category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success("Category updated successfully");
        setVisible(false);
        setUpdatedName("");
        setSelected(null);
        getAllCategory();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  // delete category
  const handleDelete = async (categoryId, categoryName) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success(`Category "${categoryName}" deleted successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Error deleting category "${categoryName}"`);
    }
  };
  

  return (
    <Layout title="Dashboard - Create Category">
      <div style={styles.container}>
        <div style={styles.adminMenuWrapper}>
          <AdminMenu />
        </div>
        <div style={styles.categoryContent}>
          <div style={styles.categoryBox}>
            <h1 style={styles.header}>Manage Categories</h1>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Category Name</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td style={styles.tableCell}>{category.name}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.editButton}
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(category.name);
                          setSelected(category);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(category._id,category.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <h2>Edit Category</h2>
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
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
  categoryContent: {
    flex: "3 1 600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBox: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: "2px solid #007bff",
    marginTop:"50px",
    marginBottom: "20px",
    maxHeight: "70vh",  // Adjust height as needed
    overflowY: "auto",  // Allow vertical scrolling for overflow
  },
  
  header: {
    fontFamily: "Cambria",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#007bff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
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
  editButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  "@media (max-width: 768px)": {
    categoryBox: {
      width: "95%",
      margin: "0 auto",
    },
    tableHeader: {
      fontSize: "0.85rem",
    },
    tableCell: {
      fontSize: "0.8rem",
    },
  },
};

export default CreateCategory;

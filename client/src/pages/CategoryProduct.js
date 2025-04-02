import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";
import toast from "react-hot-toast";
import { Link} from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
   const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container ">
      <div className="text-center " id="heading">
        <h4>Category - {category?.name}</h4>
      </div>
      <div className="text-center mt-5">
        <h6>{products?.length} result found</h6>
      </div>

        <div className="home-page">
        {products.map((product) => (
          <div className="card m-3" key={product._id}>
            <Link
              to={`/product/${product.slug}`}
              className="text-decoration-none text-dark"
              style={{ textDecoration: "none" }}
            >
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description.substring(0, 60)}...
                </p>
                <h6 className="card-price">${product.price}</h6>
              </div>
            </Link>
            <button
              className="btn btn-dark"
              onClick={(e) => {
                e.stopPropagation(); // Prevents click event from propagating to Link
                const existingItem = cart.find((item) => item._id === product._id);

                if (existingItem) {
                  toast.success("Item already exists in cart!");
                } else {
                  const updatedCart = [...cart, { ...product, quantity: 1 }]; // Start with quantity 1
                  setCart(updatedCart);
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  toast.success("Added to Cart");
                }
              }}
            >
              Add to Cart
            </button>


          </div>
        ))}
      </div>
      {/* <div className="m-2 p-3">
        {products && products.length < total && (
          <button
          className="btn btn-warning "
          onClick={(e) => {
            e.preventDefault();
            setPage(page+1);
          }}
          >
            {loading ? "loading..." : "Load More"}
          </button>
        )}
      </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;

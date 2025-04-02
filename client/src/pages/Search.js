import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../styles/Homepage.css";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search results"}>
        <div className="container home-page">
          <div className="text-center mt-5">
            <h1 >Search Results</h1>
            <h6>
              {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap">
              {values?.results.map((product) => (
                <div className="card m-3" key={product._id}>
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-decoration-none text-dark"
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;

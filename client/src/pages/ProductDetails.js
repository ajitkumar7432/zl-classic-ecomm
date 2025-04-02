import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";
import {Link} from "react-router-dom"
import "../styles/Homepage.css"

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) 
      getProduct();
  }, [params?.slug]);

  // Fetch product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle count increase or decrease
  const handleCountChange = (value) => {
    if (count + value > 0) {
      setCount(count + value);
    }
  };
  const addToCart = () => {
    let updatedCart = [...cart];

    const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
        toast.success("Item already exists in the cart!"); // Prevent duplicate additions
    } else {
        const cartItem = { ...product, quantity: 1 }; // Always start with 1
        updatedCart.push(cartItem);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item added to cart!");
    }
};

  

  
  // // Add to Cart Functionality
  // const addToCart = () => {
  //   const cartItem = { ...product, quantity: count };
  //   console.log("Adding to Cart: ", cartItem);
  
  //   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   console.log("Existing Cart: ", existingCart);
  
  //   const isProductInCart = existingCart.some(item => item._id === product._id);
  
  //   if (isProductInCart) {
  //     const updatedCart = existingCart.map(item =>
  //       item._id === product._id ? { ...item, quantity: item.quantity + count } : item
  //     );
  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   } else {
  //     setCart([...existingCart, cartItem]);
  //     localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
  //   }
  
  //   toast.success("Item added to cart!");
  // };
  

  return (
    <Layout>
      <div className="row container product-details">
        {/* Product Image */}
        <div className="col-md-6 mt-5  product-image">
          <div className="image-box">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="product-img"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 mt-5 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6><strong>Name:</strong> {product.name}</h6>
          <h6><strong>Description:</strong> {product.description}</h6>
          <h6>
            <strong>Price:</strong>{" "}
            {(product?.price * count).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6><strong>Category:</strong> {product?.category?.name}</h6>

          {/* Quantity Controller */}
          <div className="quantity-control">
            <button onClick={() => handleCountChange(-1)}>-</button>
            <span>{count}</span>
            <button onClick={() => handleCountChange(1)}>+</button>
          </div>

          {/* Add to Cart Button */}
          <button className="btn btn-success mt-3" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <hr />

      {/* Similar Products Section */}
      <div className=" container ">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        <div className="home-page">
                      {relatedProducts.map((product) => (
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
                            className="btn btn-dark "
                            onClick={(e) => {
                              e.stopPropagation();
                              setCart([...cart, product]);
                              localStorage.setItem("cart", JSON.stringify([...cart, product]));
                              toast.success("Added to Cart");
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

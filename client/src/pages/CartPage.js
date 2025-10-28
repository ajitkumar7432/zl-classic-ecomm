import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try{  
      let total = 0;
      cart?.forEach((item) =>{
        total = total + item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    }
    catch(error){
      console.log(error);
    }
};

  


  // Remove item from cart
  const removeCartItem = (pid) => {
    let myCart  = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1)
    setCart(myCart);
    localStorage.setItem('cart',JSON.stringify(myCart));
    
  };

  const updateQuantity = (pid, value) => {
    let updatedCart = cart.map((item) =>
      item._id === pid
        ? { 
            ...item, 
            quantity: Math.max(1, (item.quantity || 1) + value) // Ensure default is 1
          }
        : item
    );
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  
  


  // Handle order creation (replaced payment gateway)
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/create-order", { cart });

      if (data.success) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Order placed successfully!");
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to place order");
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        <h1 className="cart-header">
          {auth?.user ? `Welcome back, ${auth.user.name}!` : "Welcome to Your Cart"}
        </h1>
        <p className="cart-subtitle">
          {cart.length ? `You have ${cart.length} items in your cart` : "Your cart is empty"}
        </p>

        <div className="cart-content">
          {/* Scrollable Cart Items */}
          <div className="cart-items">
            {cart.map((p) => (
              <div className="cart-item" key={p._id}>
                <Link to={`/product/${p.slug}`}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="cart-item-img"
                  />
                </Link>
                <div className="cart-item-info">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}...</p>
                  <h5 className="price">Price: ₹{p.price}</h5>
                </div>
                <div className="remove">
                <button className="remove-btn" id="upperdiv" onClick={() => removeCartItem(p._id)}>
                  Remove
                </button>
                
                {/* Quantity Control */}
                <div 
                  className="quantity-control" 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    margin:"5px",
                    
                    borderRadius: "5px",
                    overflow: "hidden",
                    background: "#fff",
                    padding: "4px 5px"
                  }}
                >
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(p._id, -1)}
                    style={{
                      width: "22px",
                      height: "22px",
                      border: "1px solid black",
                      background: "#f0f0f0",
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.background = "red"}
                    onMouseOut={(e) => e.target.style.background = "#f0f0f0"}
                  >
                    -
                  </button>

                  <span 
                    className="quantity-display"
                    style={{
                      minWidth: "30px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {p.quantity}
                  </span>

                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(p._id, 1)}
                    style={{
                      width: "22px",
                      height: "22px",
                      border: "1px solid black",
                      background: "#f0f0f0",
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.background = "green"}
                    onMouseOut={(e) => e.target.style.background = "#f0f0f0"}
                  >
                    +
                  </button>
                </div>
                </div>


                
              </div>
            ))}
          </div>

          {/* Order Summary & Payment */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div>
                <p><strong>Delivery Address:</strong> {auth.user.address}</p>
                <button className="btn btn-update" onClick={() => navigate("/dashboard/user/profile")}>
                  Update Address
                </button>
              </div>
            ) : (
              auth?.token ? <button className="btn btn-update" onClick={() => navigate("/dashboard/user/profile")}>
              Update Address
            </button>: <button className="btn btn-update" onClick={() => navigate("/login")}>Login to Checkout</button>)}
              
            

            {/* Order Placement Section */}
            {auth?.token && cart.length > 0 && (
              <>
                <button 
                  className="btn btn-pay" 
                  onClick={handlePlaceOrder} 
                  disabled={loading || !auth?.user?.address}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "12px",
                    backgroundColor: loading || !auth?.user?.address ? "#ccc" : "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: loading || !auth?.user?.address ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Processing..." : "Place Order (Cash on Delivery)"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

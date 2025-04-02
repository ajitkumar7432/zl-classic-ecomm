import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Modal, Button ,Carousel} from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

   // getTotal count
   const getTotal = async () =>{
    try {
      const {data} =await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    }
    catch (error) {
      console.log(error);
      } 
   }

  // Fetch Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getTotal();
    getAllCategory();
    
  }, []);

  useEffect(() => {      
    if (page > 1) 
      loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.error("Error loading more products:", error);
    }
  };

  // Filter Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) getAllProducts();
    else filterProduct();
  }, [checked, radio]);

  // Handle Filter Checkbox
  const handleFilter = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  // Reset Filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
  };

  return (
    <Layout title="ZL-CLASSIC">
      {/* Banner */}
      <Carousel autoplay autoplaySpeed={1900} dots={true}>
        <div>
          <img src="/images/vecteezy_online-shopping-on-phone-buy-sell-business-digital-web_4299835.jpg" alt="Slide 1" style={{ width: "100%", height: "400px",marginTop:"80px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"70px", objectFit: "cover" }} />
        </div>
        <div>
          <img src="/images/vecteezy_online-shopping-on-phone-buy-sell-business-digital-web_4299822.jpg" alt="Slide 2" style={{ width: "100%", height: "400px",marginTop:"80px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"70px", objectFit: "cover" }} />
        </div>
        <div>
          <img src="/images/vecteezy_paper-art-shopping-online-on-smartphone-and-new-buy-sale_6828785.jpg" alt="Slide 3" style={{ width: "100%", height: "400px",marginTop:"80px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"70px", objectFit: "cover" }} />
        </div>
        {/* <div>
          <img src="/images/contactus.jpeg" alt="Slide 4" style={{ width: "100%", height: "300px",marginTop:"80px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"70px", objectFit: "cover" }} />
        </div>
        <div>
          <img src="/images/contactus.jpeg" alt="Slide 5" style={{ width: "100%", height: "300px",marginTop:"80px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"70px", objectFit: "cover" }} />
        </div> */}
      </Carousel>

      <div className="container-fluid row mt-3 home-page">
        {/* Always Visible Filter Button */}
        
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="filter-button"
              style={{
                
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '10px 20px 35px',
                border:'2px solid black',
                backgroundColor: 'darkorange',
                color: 'black',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '19px',
                textTransform: 'uppercase',
                transition: 'background-color 0.3s',
                textAlign: 'center'
              }}
            >
              Apply Filters
            </Button>


        {/* Filter Modal */}
        <Modal
          title="Apply Filters"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          className="filter-modal"
        >
          {/* Category Filters */}
          <h4>Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                checked={checked.includes(category._id)}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filters */}
          <h4 className="mt-3">Filter by Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
            {Prices.map((price) => (
              <Radio key={price._id} value={price.array}>
                {price.name}
              </Radio>
            ))}
          </Radio.Group>

          {/* Filter Action Buttons */}
          <div className="filter-buttons mt-3">
            <Button className="reset-button" onClick={resetFilters}>
              Reset
            </Button>
            <Button className="cancel-button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="apply-button" onClick={() => setIsModalOpen(false)}>
              Apply
            </Button>
          </div>
        </Modal>

        {/* Product Display */}
        <div className="container">
      <h1 className="text-center">All Products</h1>
      <div className="home-page">
        {products.map((product) => (
          <div className="card m-2" key={product._id}>
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
      <div className="m-2 p-3">
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
      </div>
    </div>
      </div>
      
    </Layout>
  );
};

export default HomePage;

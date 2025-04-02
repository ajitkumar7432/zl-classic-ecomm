import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          {/* Sidebar Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">Your Orders</h1>
            <div className="orders-container">
              {orders?.map((o, i) => (
                <div className="border shadow p-3 mb-3 rounded" key={i}>
                  <table className="table table-responsive-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "✅ Success" : "❌ Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Product List in Order */}
                  <div className="container-fluid">
                    {o?.products?.map((p) => (
                      <div className="row mb-2 p-2 card flex-row align-items-center" key={p._id}>
                        <div className="col-4 col-md-2">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="img-fluid rounded"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-8 col-md-10">
                          <p className="fw-bold mb-1">{p.name}</p>
                          <p className="text-muted mb-1">{p.description.substring(0, 30)}...</p>
                          <p className="text-primary fw-bold">₹ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

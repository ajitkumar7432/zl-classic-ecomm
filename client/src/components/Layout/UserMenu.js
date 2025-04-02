import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="user-menu-container">
        <div className="list-group dashboard-menu">
          <h4 className="user-panel-title">Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item"
          >
            Orders
          </NavLink>
        </div>
      </div>

      {/* Inline CSS Styling */}
      <style jsx="true">{`
        .user-menu-container {
          margin-top: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.5);
        }

        .user-panel-title {
          margin-bottom: 15px;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          text-align: center;
          font-size: 1.5em;
          font-weight: bold;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);
        }

        .list-group-item {
          background-color: #fff;
          color: #333;
          margin-bottom: 10px;
          padding: 10px;
          font-size: 1.1em;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.3s;
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7);
        }

        .list-group-item:hover {
          background-color: #007bff;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }

        .list-group-item.active {
          background-color: #0056b3;
          color: white;
          font-weight: bold;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default UserMenu;

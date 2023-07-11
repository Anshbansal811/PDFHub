import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/file-upload"
            className="list-group-item list-group-item-action"
          >
            Upload file 
          </NavLink>
          <NavLink
            to="/dashboard/admin/file"
            className="list-group-item list-group-item-action"
          >
            Admin Pdf file 
          </NavLink>
          <NavLink
            to="/dashboard/admin/ShareFile"
            className="list-group-item list-group-item-action"
          >
            Share for Pdf file 
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
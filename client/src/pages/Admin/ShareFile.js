import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ShareFile = () => {
  const [files, setFiles] = useState([]);
  const [auth, setAuth] = useState([]);
  
  //getall file
  const getAllfile = async () => {
    try {
      const { data } = await axios.get("/api/v1/file/get-file");
      setFiles(data.files);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllfile();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
        <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Files List</h1>
          <div className="mb-3">
                <textarea
                  type="text"
                  value={auth}
                  placeholder="Enter File Name"
                  className="form-control"
                  onChange={(e) => setAuth(e.target.value)}
                />
              </div>
          <div className="col-md card-center" >
          {files?.map((p) => {
            console.log(p);
  if (p.slug === auth) {
    return (
        <div className="card m-1 w-75" style={{ width: "18rem" }}>
          <div className="m-0">
          <h6 className="card"><p>File Name:{p.slug}</p>Share link:<Link to={`http://localhost:8000/api/v1/file/file-pdf/${p._id}`} className="file-link">
             {`http://localhost:8000/api/v1/file/file-pdf/${p._id}`}
          </Link></h6>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                <p className="card-text"><h6>Your Comments: {p.description}</h6></p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                <p className="card-text"><h6>Other Comments: {p.Userdescription}</h6></p>
                <a href={`/dashboard/admin/ShareFile/${p.slug}`}>
                <button type="button" class="btn btn-outline-primary">Comments</button></a>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
      }
      return null;
      })}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShareFile;
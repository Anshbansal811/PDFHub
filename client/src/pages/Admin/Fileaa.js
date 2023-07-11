import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../../components/Form/SearchInput";

const Fileaa = () => {
  const [files, setFiles] = useState([]);
  const [auth] = useAuth();
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
          <SearchInput />
          <p></p>
          <div className="col-md card-center" >
          {files?.map((p) => {
  if (p.name === (auth?.user?.name)) {
    return (
        <div className="card w-75 " style={{ width: "20rem"}} >
          <div className="mr-md-3 margin-right: 18rem">
          <h6 className="card"><p>File Name:{p.slug}</p>Share link:<Link to={`http://localhost:8000/api/v1/file/file-pdf/${p._id}`} className="file-link">
             {`http://localhost:8000/api/v1/file/file-pdf/${p._id}`}
          </Link></h6>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                <p className="card-text"><h6>Your Comments: {p.description}</h6></p>
                <a href={`/dashboard/admin/file/${p.slug}`}>
                <button type="button" class="btn btn-outline-primary">Comments</button></a>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                <p className="card-text"><h6>Other Comments: {p.Userdescription}</h6></p>
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

export default Fileaa;
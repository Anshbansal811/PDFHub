import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateComment = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
  
    //get single file
    const getSinglefile = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/file/get-file/${params.slug}`
        );
        setName(data.file.name);
        setId(data.file._id);
        setDescription(data.file.description);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getSinglefile();
      //eslint-disable-next-line
    }, []);

    //get all category
  const getAllFile = async () => {
    try {
      const { data } = await axios.get("/api/v1/file/get-file");
      if (data?.success) {
        setFile(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllFile();
  }, []);

    //create file function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const fileData = new FormData();
        fileData.append("name", name);
        fileData.append("description", description);
        const { data } = axios.put(
          `/api/v1/file/update-file/${id}`,
          fileData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("file Updated Successfully");
          navigate("/dashboard/admin/file");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
  
  return (
    <Layout title={"Dashboard - Create file"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Comments</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Comments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateComment;
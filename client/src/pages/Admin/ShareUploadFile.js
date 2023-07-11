import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ShareUploadFile = () => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [userdescription, setUserdescription] = useState("");
  const [Pdf, setPdf] = useState("");
  const [auth] = useAuth();
//upload file function
  const handleupload = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("name", auth?.user?.name);
      fileData.append("Userdescription", userdescription);
      fileData.append("slug", slug);
      fileData.append("Pdf", Pdf);
      const { data } = axios.post("/api/v1/file/file-upload",fileData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("file uploadd Successfully");
        navigate("/dashboard/admin/ShareFile");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - File Upload"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>File Upload</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                {Pdf ? Pdf.name : "Upload Pdf"}
                <input
                    type="file"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={(e) =>  {
                      const file = e.target.files[0];
                      if (file && file.type === "application/pdf") {
                        setPdf(file);
                        toast.success("File is a valid PDF.");
                        } else {
                          setPdf(null);
                          toast.error("Please upload a valid PDF file.");
                          }
                        }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={userdescription}
                  placeholder="write a comment"
                  className="form-control"
                  onChange={(e) => setUserdescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={slug}
                  placeholder="Enter File Name"
                  className="form-control"
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleupload}>
                  upload file
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShareUploadFile;
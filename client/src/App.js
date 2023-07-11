import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import Users from "./pages/Admin/Users.js";
import UploadFile from "./pages/Admin/UploadFile.js";
import UpdateComment from "./pages/Admin/UpdateComment.js";
import Fileaa from "./pages/Admin/Fileaa";
import ShareFile from "./pages/Admin/ShareFile";
import ShareUploadFile from "./pages/Admin/ShareUploadFile";
import ShareUpdateComment from "./pages/Admin/ShareUpdateComment";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/file" element={<Fileaa/>} />
          <Route path="admin/ShareFile" element={<ShareFile/>} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/file/:slug" element={<UpdateComment />} />
          <Route path="admin/ShareFile/:slug" element={<ShareUpdateComment />} />
          <Route path="admin/file-upload" element={<UploadFile />} />
          <Route path="admin/file-upload" element={<ShareUploadFile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
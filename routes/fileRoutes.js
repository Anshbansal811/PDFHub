import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createfileController, 
    deletefileController, 
    filePdfController, 
    getSinglefileController, 
    getfileController,
    searchFileController,
    updatefileController, } from "../controllers/fileController.js";

const router = express.Router();

//routes
router.post(
  "/file-upload",
  requireSignIn,
  isAdmin,
  formidable(),
  createfileController
);
//routes
router.put(
  "/update-file/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updatefileController
);

//get file
router.get("/get-file", getfileController);

//single file
router.get("/get-file/:slug", getSinglefileController);

//get pdf
router.get("/file-Pdf/:pid", filePdfController);

//delete rfile
router.delete("/file/:pid", deletefileController);

//search product
router.get("/search/:keyword", searchFileController);

export default router;
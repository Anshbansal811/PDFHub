import fileModel from "../models/fileModel.js";
import fs from "fs";
import slugify from "slugify";

export const createfileController = async (req, res) => {
  try {
    const { name, description, slug, Userdescription} =req.fields;
    const { Pdf } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case (!description && !Userdescription):
        return res.status(500).send({ error: "Description or Userdescription is Required" });
      case !slug:
        return res.status(500).send({ error: "slug is Required" });
      case Pdf && Pdf.size > 10000000:
        return res
          .status(500)
          .send({ error: "Pdf is Required and should be less then 10mb" });
    }

    const file = new fileModel({ ...req.fields, slug: slugify(slug) });
    if (Pdf) {
      file.Pdf.data = fs.readFileSync(Pdf.path);
      file.Pdf.contentType = Pdf.type;
    }
    await file.save();
    res.status(201).send({
      success: true,
      message: "file Created Successfully",
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing file",
    });
  }
};

//get all files
export const getfileController = async (req, res) => {
  try {
    const files = await fileModel
      .find({},"-Pdf")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      counTotal: files.length,
      message: "ALL files ",
      files,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting files",
      error: error.message,
    });
  }
};
// get single file
export const getSinglefileController = async (req, res) => {
  try {
    const file = await fileModel
      .findOne({ slug: req.params.slug })
      .select("-Pdf")
    res.status(200).send({
      success: true,
      message: "Single file Fetched",
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single file",
      error,
    });
  }
};

// get Pdf
export const filePdfController = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.pid).select("Pdf");
    if (file.Pdf.data) {
      res.set("Content-type", file.Pdf.contentType);
      return res.status(200).send(file.Pdf.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting Pdf",
      error,
    });
  }
};

//delete controller
export const deletefileController = async (req, res) => {
  try {
    await fileModel.findByIdAndDelete(req.params.pid).select("-Pdf");
    res.status(200).send({
      success: true,
      message: "file Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting file",
      error,
    });
  }
};

//upate filea
export const updatefileController = async (req, res) => {
  try {
    const {description, name, Userdescription} = req.fields;
    //alidation
    switch (true) {
      case (!description && !Userdescription) :
        return res.status(500).send({ error: "Description is Required" });
      case !name:
      return res.status(500).send({ error: "slug is Required" });
    }
    const file = await fileModel.findByIdAndUpdate(req.params.pid,{ ...req.fields},{new:true});
    await file.save();
    res.status(201).send({
      success: true,
      message: "fileUpdated Successfully",
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte file",
    });
  }
};

// search File
export const searchFileController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await fileModel
      .find({
        $or: [
          { slug: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-Pdf");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search File API",
      error,
    });
  }
};
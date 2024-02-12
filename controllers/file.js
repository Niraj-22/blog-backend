const path = require("path");
const generateCode = require("../utils/generateCode");
const { validateExtension } = require("../validators/file");
const { File } = require("../models");
const fs = require("fs");

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      res.code = 4000;
      throw new Error("File not selected");
    }
    const originalName = file.originalname;
    const extension = path.extname(file.originalname);
    const filename = originalName.replace(extension, "");
    const compressedFilename = filename.split(" ").join("_");
    const lowercaseFilename = compressedFilename.toLocaleLowerCase();
    const code = generateCode(6);

    const isValidExt = validateExtension(extension);

    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only .jpg or .jpeg or .png or .pdf file format allowed");
    }

    const key = `${lowercaseFilename}_${code}`;
    if (key) {
      const newFile = new File({
        key,
        size: file.size,
        mimetype: file.mimetype,
        createdBy: req.user._id,
        path: file.path,
      });

      await newFile.save();
    }

    res
      .status(200)
      .json({ code: 200, status: true, message: "File uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

const getSignUrl = async (req, res, next) => {
  try {
    const { q } = req.query;
    const file = await File.findById(q);
    const url = file.path;
    res
      .status(200)
      .json({ code: 200, status: true, message: "Get url", data: { url } });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { q } = req.query;
    const file = await File.findById(q);
    const url = `/home/nirajchordia/Documents/Code/rest-api/${file.path}`;
    fs.unlinkSync(url);
    await File.findByIdAndDelete({ _id: q });
    res
      .status(200)
      .json({ code: 200, status: true, message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, getSignUrl, deleteFile };

import multer from "multer";

export const uploadFile = multer({
  dest: "avatar",
  limits: {
    fileSize: 2000008,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(.png|.jpg|.jpeg)$/)) {
      return callback(new Error("Please upload a image"));
    }
    callback(undefined, true);
  },
});

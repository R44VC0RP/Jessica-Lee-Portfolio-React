const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};

module.exports = { uploadRouter };
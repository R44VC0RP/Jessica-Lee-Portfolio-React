const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 10,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("PDF upload completed", data);
  }),
};

module.exports = { uploadRouter };
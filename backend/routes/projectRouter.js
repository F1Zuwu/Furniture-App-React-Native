const BaseRouter = require("./BaseRouter");
const serviceController = require("../controllers/serviceController");
const { upload, controller: imageUploadController } = require("../controllers/imageUploadController");

class ProjectRouter extends BaseRouter {
  constructor() {
    super();

    // 5 Essential HTTP Methods (plus GET /:id)
    this.registerRoute("get", "/", serviceController.getAll);
    this.registerRoute("get", "/:id", serviceController.getById);
    this.registerRoute("post", "/", serviceController.create);
    this.registerRoute("put", "/:id", serviceController.putUpdate);
    this.registerRoute("patch", "/:id", serviceController.patchUpdate);
    this.registerRoute("delete", "/:id", serviceController.remove);

    // Uploads
    // Generic upload: returns URLs you can store yourself
    this.registerRoute("post", "/upload", upload.array("images", 10), imageUploadController.uploadMany);

    // Upload and attach directly to a service
    this.registerRoute(
      "post",
      "/:id/images",
      upload.array("images", 10),
      imageUploadController.uploadAndAttachToService
    );
  }
}

module.exports = new ProjectRouter().getRouter();

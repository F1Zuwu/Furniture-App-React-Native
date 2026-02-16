const fs = require("fs");
const path = require("path");
const multer = require("multer");

const { models } = require("../database");
const BaseController = require("./BaseController");

const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");
const SERVICES_DIR = path.join(UPLOAD_ROOT, "services");

function ensureDirs() {
  fs.mkdirSync(SERVICES_DIR, { recursive: true });
}

function safeExt(originalName) {
  const ext = path.extname(originalName || "").toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext;
  return ".jpg";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureDirs();
    cb(null, SERVICES_DIR);
  },
  filename: (req, file, cb) => {
    const ext = safeExt(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image uploads are allowed"));
  },
});

function toPublicUrl(req, filename) {
  // Served via app.use('/uploads', express.static(...))
  const host = req.get("host");
  const proto = req.protocol;
  return `${proto}://${host}/uploads/services/${filename}`;
}

class ImageUploadController extends BaseController {
  constructor() {
    super();
  }

  // Generic upload endpoint: POST /services/upload (field name: images)
  uploadMany = (req, res) =>
    this.handleRequest(req, res, async () => {
      const files = req.files || [];
      const payload = files.map((f) => ({
        filename: f.filename,
        originalname: f.originalname,
        url: toPublicUrl(req, f.filename),
        size: f.size,
        mimetype: f.mimetype,
      }));

      return res.status(201).json({ success: true, files: payload });
    });

  // Upload and attach to a service: POST /services/:id/images (field name: images)
  uploadAndAttachToService = (req, res) =>
    this.handleRequest(req, res, async () => {
      const serviceId = Number(req.params.id);
      if (!Number.isFinite(serviceId)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
      }

      const service = await models.Services.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ success: false, message: "Service not found" });
      }

      const files = req.files || [];
      if (files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      const currentMax = await models.ServiceImages.max("sortOrder", {
        where: { serviceId },
      });
      const base = Number.isFinite(currentMax) ? currentMax + 1 : 0;

      const rows = files.map((f, idx) => ({
        serviceId,
        url: toPublicUrl(req, f.filename),
        sortOrder: base + idx,
      }));

      await models.ServiceImages.bulkCreate(rows);

      const updated = await models.Services.findByPk(serviceId, {
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      return res.status(201).json({ success: true, data: updated });
    });
}

module.exports = {
  upload,
  controller: new ImageUploadController(),
};

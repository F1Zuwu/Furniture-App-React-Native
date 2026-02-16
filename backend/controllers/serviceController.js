const { models } = require("../database");
const BaseController = require("./BaseController");

class ServiceController extends BaseController {
  constructor() {
    super();
  }

  getAll = (req, res) =>
    this.handleRequest(req, res, async () => {
      const services = await models.Services.findAll({
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          ["id", "DESC"],
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      return res.json({ success: true, data: services });
    });

  getById = (req, res) =>
    this.handleRequest(req, res, async () => {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
      }

      const service = await models.Services.findByPk(id, {
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      if (!service) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      return res.json({ success: true, data: service });
    });

  create = (req, res) =>
    this.handleRequest(req, res, async () => {
      const { title, price, description, category, images } = req.body;
      if (!title || price === undefined || !description || !category) {
        return res
          .status(400)
          .json({ success: false, message: "title, price, description, category are required" });
      }

      const created = await models.sequelize.transaction(async (t) => {
        const service = await models.Services.create(
          {
            title,
            price,
            description,
            category,
          },
          { transaction: t }
        );

        if (Array.isArray(images) && images.length > 0) {
          await models.ServiceImages.bulkCreate(
            images
              .filter((u) => typeof u === "string" && u.trim().length > 0)
              .map((url, idx) => ({
                serviceId: service.id,
                url,
                sortOrder: idx,
              })),
            { transaction: t }
          );
        }

        return service;
      });

      const serviceWithImages = await models.Services.findByPk(created.id, {
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      return res.status(201).json({ success: true, data: serviceWithImages });
    });

  putUpdate = (req, res) =>
    this.handleRequest(req, res, async () => {
      const id = Number(req.params.id);
      const { title, price, description, category, images } = req.body;

      if (!Number.isFinite(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
      }
      if (!title || price === undefined || !description || !category) {
        return res
          .status(400)
          .json({ success: false, message: "title, price, description, category are required" });
      }

      const updated = await models.sequelize.transaction(async (t) => {
        const service = await models.Services.findByPk(id, { transaction: t });
        if (!service) return null;

        await service.update({ title, price, description, category }, { transaction: t });

        if (Array.isArray(images)) {
          await models.ServiceImages.destroy({ where: { serviceId: id }, transaction: t });
          await models.ServiceImages.bulkCreate(
            images
              .filter((u) => typeof u === "string" && u.trim().length > 0)
              .map((url, idx) => ({ serviceId: id, url, sortOrder: idx })),
            { transaction: t }
          );
        }

        return service;
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      const serviceWithImages = await models.Services.findByPk(id, {
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      return res.json({ success: true, data: serviceWithImages });
    });

  patchUpdate = (req, res) =>
    this.handleRequest(req, res, async () => {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
      }

      const { title, price, description, category, images } = req.body;

      const updated = await models.sequelize.transaction(async (t) => {
        const service = await models.Services.findByPk(id, { transaction: t });
        if (!service) return null;

        const patch = {};
        if (title !== undefined) patch.title = title;
        if (price !== undefined) patch.price = price;
        if (description !== undefined) patch.description = description;
        if (category !== undefined) patch.category = category;
        if (Object.keys(patch).length > 0) {
          await service.update(patch, { transaction: t });
        }

        if (Array.isArray(images)) {
          await models.ServiceImages.destroy({ where: { serviceId: id }, transaction: t });
          await models.ServiceImages.bulkCreate(
            images
              .filter((u) => typeof u === "string" && u.trim().length > 0)
              .map((url, idx) => ({ serviceId: id, url, sortOrder: idx })),
            { transaction: t }
          );
        }

        return service;
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      const serviceWithImages = await models.Services.findByPk(id, {
        include: [{ model: models.ServiceImages, as: "images" }],
        order: [
          [{ model: models.ServiceImages, as: "images" }, "sortOrder", "ASC"],
          [{ model: models.ServiceImages, as: "images" }, "id", "ASC"],
        ],
      });

      return res.json({ success: true, data: serviceWithImages });
    });

  remove = (req, res) =>
    this.handleRequest(req, res, async () => {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
      }

      const deleted = await models.sequelize.transaction(async (t) => {
        await models.ServiceImages.destroy({ where: { serviceId: id }, transaction: t });
        return models.Services.destroy({ where: { id }, transaction: t });
      });

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      return res.json({ success: true, message: "Deleted" });
    });


}

module.exports = new ServiceController();
import express from "express";
import auth from "../middleware/auth.js";
import categoryController from '../controller/categoryController.js'; 

const categoryRouter = express.Router();

const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  addService,
  getServiceById,
  updateService,
  deleteService,
} = categoryController;

// Category routes
categoryRouter.post("/create-category", auth, createCategory);
categoryRouter.get("/get-categories", auth, getAllCategory);
categoryRouter.put("/update-category/:categoryId", auth, updateCategory);
categoryRouter.delete("/delete-category/:categoryId", auth, deleteCategory);

// Service routes
categoryRouter.post("/add-service/:categoryId", auth, addService);
categoryRouter.get("/get-service/:categoryId", auth, getServiceById);
categoryRouter.put("/update-service/:categoryId/:serviceId", auth, updateService);
categoryRouter.delete("/delete-service/:categoryId/:serviceId", auth, deleteService);

export default categoryRouter;

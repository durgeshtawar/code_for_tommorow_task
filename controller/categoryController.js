import PriceOption from "../models/priceModel.js";
import Category from "../models/categoryModel.js";
import Service from "../models/serviceModel.js";

// Create Category
const createCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(200).json({ message: "Category created successfully!", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding category" });
  }
};

// Get All Categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong while fetching categories" });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json({ message: "Category updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Delete Category (only if empty)
const deleteCategory = async (req, res) => {
  try {
    const services = await Service.find({ categoryId: req.params.categoryId });
    if (services.length > 0) {
      return res.status(400).json({ message: "Category is not empty" });
    }
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

// Add Service to Category
const addService = async (req, res) => {
  try {
    const { name, type, priceOption } = req.body;

    const service = new Service({
      categoryId: req.params.categoryId,
      name,
      type,
    });
    await service.save();

    if (Array.isArray(priceOption)) {
      await PriceOption.insertMany(
        priceOption.map((p) => ({ ...p, serviceId: service._id }))
      );
    }

    res.status(200).json({ message: "Service added successfully", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding service" });
  }
};

// Get All Services in Category
const getServiceById = async (req, res) => {
  try {
    const services = await Service.find({ categoryId: req.params.categoryId });
    const result = await Promise.all(
      services.map(async (s) => {
        const price = await PriceOption.find({ serviceId: s._id });
        return { ...s.toObject(), priceOption: price };
      })
    );
    res.status(200).json({ message: "Services retrieved", services: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving services" });
  }
};

// Update Service
const updateService = async (req, res) => {
  try {
    const { name, type, priceOption } = req.body;

    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.serviceId, categoryId: req.params.categoryId },
      { name, type },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (Array.isArray(priceOption)) {
      await PriceOption.deleteMany({ serviceId: updatedService._id });
      await PriceOption.insertMany(
        priceOption.map((p) => ({ ...p, serviceId: updatedService._id }))
      );
    }

    res.status(200).json({ message: "Service updated", service: updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating service" });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    await PriceOption.deleteMany({ serviceId: req.params.serviceId });
    await Service.findOneAndDelete({
      _id: req.params.serviceId,
      categoryId: req.params.categoryId,
    });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service" });
  }
};

export default {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  addService,
  getServiceById,
  updateService,
  deleteService,
};

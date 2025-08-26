import { Request, Response } from "express";
import PriceList from "../models/PriceList";

// @desc   Get all price list items
export const getPriceList = async (_: Request, res: Response) => {
  try {
    const items = await PriceList.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch price list", error });
  }
};

// @desc   Create a new price list item
export const createPriceListItem = async (req: Request, res: Response) => {
  try {
    const newItem = new PriceList(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create price list item", error });
  }
};

// @desc   Update price list item
export const updatePriceListItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await PriceList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update item", error });
  }
};

// @desc   Delete price list item
export const deletePriceListItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await PriceList.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};

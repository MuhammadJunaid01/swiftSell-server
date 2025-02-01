import { Types } from "mongoose";
import { AppError } from "../../errors/globalError";
import { IPaginationOption } from "../../interfaces";
import { StatusCodes } from "../../lib/statusCode";
import { ICategoryFilterableField } from "../category/category.interface";
import SubCategory from "../sub-category/sub-category.model";
import { DeviceType, IProduct } from "./product.interface";
import { Product } from "./product.model";

export const ProductServices = {
  createProduct: async (data: IProduct) => {
    const isExistSubcategory = await SubCategory.exists({
      _id: new Types.ObjectId(data?.subCategory),
      category: new Types.ObjectId(data.category),
    });
    if (!isExistSubcategory) {
      throw new AppError(
        "The specified subcategory does not exist for the given category.",
        StatusCodes.BAD_REQUEST
      );
    }
    const product = new Product(data);
    return await product.save();
  },

  updateProductViews: async (
    productId: string,
    deviceType: DeviceType
  ): Promise<void> => {
    const updateField = `views.${deviceType}`;
    await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { [updateField]: 1, "views.total": 1 },
      },
      { new: true }
    );
  },
  updateProductImages: async (
    productId: string,
    images: string[]
  ): Promise<void> => {
    try {
      await Product.findByIdAndUpdate(
        productId,
        { $addToSet: { images: { $each: images } } }, // Add images to the array only if they are unique
        { new: true }
      );
    } catch (error: any) {
      throw new AppError(
        `Failed to update images: ${error.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  deleteProductImage: async (
    productId: string,
    imageUrl: string
  ): Promise<void> => {
    try {
      await Product.findByIdAndUpdate(
        productId,
        { $pull: { images: imageUrl } }, // Remove the specific image URL from the array
        { new: true }
      );
    } catch (error: any) {
      throw new AppError(
        `Failed to delete image: ${error.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  getAllProducts: async (
    filters: ICategoryFilterableField,
    pagination: IPaginationOption
  ) => {
    return await Product.find().populate("category").populate("subCategory");
  },
  getProductById: async (id: string) => {
    return await Product.findById(id).populate("category subCategory reviews");
  },
  updateProduct: async (id: string, data: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  },
  deleteProduct: async (id: string) => {
    return await Product.findByIdAndUpdate(id, { isActive: false });
  },
  getRelatedProducts: async (
    productId: Types.ObjectId,
    limit: number = 5
  ): Promise<IProduct[]> => {
    try {
      // Fetch the main product to use its attributes for finding related products
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // Find related products
      const relatedProducts = await Product.find({
        _id: { $ne: productId }, // Exclude the current product
        isActive: true, // Only active products
        $or: [
          { category: product.category }, // Same category
          { tags: { $in: product.tags } }, // At least one matching tag
        ],
      })
        .limit(limit)
        .select("name mainImage price category averageRating tags");

      return relatedProducts;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  },
};

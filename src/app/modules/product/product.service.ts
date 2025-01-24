import httpStatus from "http-status";
import { AppError } from "../../errors/globalError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
type IQuery = {
  pagination: {
    page: number;
    limit: number;
  };
};
export const ProductServices = {
  createProduct: async (data: IProduct) => {
    const product = new Product(data);
    return await product.save();
  },

  updateProductViews: async (productId: string): Promise<void> => {
    try {
      await Product.findByIdAndUpdate(
        productId,
        { $inc: { views: 1 } },
        { new: true }
      );
    } catch (error: any) {
      throw new AppError(
        `Failed to update views: ${error.message}`,
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
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
        httpStatus.INTERNAL_SERVER_ERROR
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
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  },
  getAllProducts: async () => {
    return await Product.find();
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
};

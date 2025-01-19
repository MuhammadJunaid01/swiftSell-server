import { IProduct } from "./product.interface";
import { Product } from "./product.model";

export const ProductServices = {
  createProduct: async (data: IProduct) => {
    const product = new Product(data);
    return await product.save();
  },
  getAllProducts: async () => {
    return await Product.find().populate("category subCategory");
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

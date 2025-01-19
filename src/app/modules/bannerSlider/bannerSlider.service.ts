import { IBannerSlider } from "./bannerSlider.interface";
import { BannerSlider } from "./bannerSlider.model";

export const createBanner = async (
  bannerData: IBannerSlider
): Promise<IBannerSlider> => {
  return await BannerSlider.create(bannerData);
};

export const getBanners = async (): Promise<IBannerSlider[]> => {
  return await BannerSlider.find().sort({ displayOrder: 1 });
};

export const updateBanner = async (
  id: string,
  updatedData: Partial<IBannerSlider>
): Promise<IBannerSlider | null> => {
  return await BannerSlider.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteBanner = async (
  id: string
): Promise<IBannerSlider | null> => {
  return await BannerSlider.findByIdAndDelete(id);
};

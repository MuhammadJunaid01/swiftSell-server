"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.getBanners = exports.createBanner = void 0;
const bannerSlider_model_1 = require("./bannerSlider.model");
const createBanner = (bannerData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bannerSlider_model_1.BannerSlider.create(bannerData);
});
exports.createBanner = createBanner;
const getBanners = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bannerSlider_model_1.BannerSlider.find().sort({ displayOrder: 1 });
});
exports.getBanners = getBanners;
const updateBanner = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bannerSlider_model_1.BannerSlider.findByIdAndUpdate(id, updatedData, { new: true });
});
exports.updateBanner = updateBanner;
const deleteBanner = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bannerSlider_model_1.BannerSlider.findByIdAndDelete(id);
});
exports.deleteBanner = deleteBanner;

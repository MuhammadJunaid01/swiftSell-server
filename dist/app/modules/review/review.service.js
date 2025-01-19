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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveReview = exports.deleteReview = exports.getReviewsForProduct = exports.createReview = void 0;
const http_status_1 = __importDefault(require("http-status"));
const globalError_1 = require("../../errors/globalError");
const review_model_1 = require("./review.model");
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.create(reviewData);
    return review;
});
exports.createReview = createReview;
const getReviewsForProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find({
        product: productId,
        isDeleted: false,
        isApproved: true,
    }).populate("user", "name profileImage");
});
exports.getReviewsForProduct = getReviewsForProduct;
const deleteReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findById(reviewId);
    if (!review) {
        throw new globalError_1.AppError("Review not found", http_status_1.default.NOT_FOUND);
    }
    if (review.user.toString() !== userId) {
        throw new globalError_1.AppError("Unauthorized to delete this review", http_status_1.default.FORBIDDEN);
    }
    review.isDeleted = true;
    yield review.save();
});
exports.deleteReview = deleteReview;
const approveReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.findByIdAndUpdate(reviewId, { isApproved: true }, { new: true });
});
exports.approveReview = approveReview;

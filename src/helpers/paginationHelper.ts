import { IPaginationOption } from "../app/interfaces";

interface IOptionWithSkip extends IPaginationOption {
  skip: number;
}
export const paginationHelper = (
  option: IPaginationOption
): IOptionWithSkip => {
  console.log("option ghgfhgfhgf", option);
  const page = Number(option.page) || 1;
  const limit = Number(option.limit) || 30;
  const skip = (page - 1) * limit;

  const sortBy = option.sortBy || "createdAt";
  const sortOrder = option.sortOrder || "asc";

  return { page, limit, skip, sortBy, sortOrder };
};

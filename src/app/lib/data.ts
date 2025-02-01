export type CategoryType =
  | "fashion"
  | "electronics"
  | "appliances"
  | "beauty"
  | "furniture";

export const categories: { name: string; image: string }[] = [
  {
    name: "fashion",
    image: "https://i.ibb.co.com/9cDVwXG/men-shirt-1.png",
  },
  {
    name: "electronics",
    image: "https://i.ibb.co.com/b6N5hbV/electronics.jpg",
  },
  {
    name: "appliances",
    image: "https://i.ibb.co.com/kMf2s50/appliances.jpg",
  },
  {
    name: "beauty",
    image: "https://i.ibb.co.com/Y7CxZQc/beauty.jpg",
  },
  {
    name: "furniture",
    image: "https://i.ibb.co.com/c6fB4L4/furniture.jpg",
  },
];

export const fashionSubcategories: { name: string; image: string }[] = [
  {
    name: "Men’s Clothing",
    image: "https://i.ibb.co.com/9cDVwXG/men-shirt-1.png",
  },
  {
    name: "Women’s Clothing",
    image: "https://i.ibb.co.com/V9hpbWz/women-1.png",
  },
  {
    name: "Kid’s Wear",
    image: "https://i.ibb.co.com/wyg1zcN/children-1.png",
  },
  {
    name: "Shoes",
    image: "https://i.ibb.co.com/tCSgPn3/shoes.jpg",
  },
  {
    name: "Accessories",
    image: "https://i.ibb.co.com/pJJQRDB/accessories.jpg",
  },
  {
    name: "Bags",
    image: "https://i.ibb.co.com/bX8Zwwn/bags.jpg",
  },
  {
    name: "Watches",
    image: "https://i.ibb.co.com/7vkhtzn/watch.jpg",
  },
  {
    name: "Jewelry",
    image: "https://i.ibb.co.com/gVPj5GW/jewelry.jpg",
  },
  {
    name: "Ethnic Wear",
    image: "https://i.ibb.co.com/k87fgXD/ethnic-Wear.webp",
  },
  {
    name: "Sportswear",
    image: "https://i.ibb.co.com/b5YyG8v/sportswear.jpg",
  },
];

export const electronicsSubcategories: { name: string; image: string }[] = [
  { name: "Mobile Phones", image: "https://i.ibb.co.com/0RP9T9dV/mobile.webp" },
  { name: "Laptops", image: "https://i.ibb.co.com/7dWggwXZ/laptop.webp" },
  { name: "Tablets", image: "path/to/tablets_image.jpg" },
  { name: "Televisions", image: "path/to/televisions_image.jpg" },
  { name: "Cameras", image: "path/to/cameras_image.jpg" },
  { name: "Headphones", image: "path/to/headphones_image.jpg" },
  { name: "Smartwatches", image: "path/to/smartwatches_image.jpg" },
  { name: "Gaming Consoles", image: "path/to/gaming_consoles_image.jpg" },
  { name: "Drones", image: "path/to/drones_image.jpg" },
  { name: "Home Audio", image: "path/to/home_audio_image.jpg" },
];

export const appliancesSubcategories: string[] = [
  "Refrigerators",
  "Washing Machines",
  "Microwaves",
  "Air Conditioners",
  "Water Heaters",
  "Vacuum Cleaners",
  "Dishwashers",
  "Mixers & Blenders",
  "Ovens",
  "Air Purifiers",
];

export const beautySubcategories: string[] = [
  "Makeup",
  "Skincare",
  "Haircare",
  "Fragrances",
  "Nail Care",
  "Bath & Body",
  "Men’s Grooming",
  "Beauty Tools",
  "Organic Products",
  "Salon Equipment",
];

export const furnitureSubcategories: string[] = [
  "Living Room Furniture",
  "Bedroom Furniture",
  "Dining Room Furniture",
  "Office Furniture",
  "Outdoor Furniture",
  "Kids’ Furniture",
  "Storage Solutions",
  "Mattresses",
  "Lighting",
  "Home Decor",
];

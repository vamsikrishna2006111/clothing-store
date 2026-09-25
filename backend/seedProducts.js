const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "VK Oversized Black T-Shirt",
    brand: "VK FASHIONS",
    description:
      "Premium oversized cotton T-shirt with a modern streetwear fit.",
    price: 999,
    oldPrice: 1499,
    category: "T-Shirts",
    gender: "Unisex",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    stock: 50,
    rating: 4.7,
    reviewsCount: 128,
    featured: true,
    isNew: true,
    discount: 33,
  },

  {
    name: "VK Premium White Shirt",
    brand: "VK FASHIONS",
    description:
      "Clean premium white shirt designed for casual and smart occasions.",
    price: 1499,
    oldPrice: 1999,
    category: "Shirts",
    gender: "Men",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    stock: 35,
    rating: 4.6,
    reviewsCount: 94,
    featured: true,
    isNew: true,
    discount: 25,
  },

  {
    name: "VK Classic Blue Jeans",
    brand: "VK FASHIONS",
    description:
      "Classic blue denim jeans with a comfortable modern fit.",
    price: 1799,
    oldPrice: 2499,
    category: "Jeans",
    gender: "Men",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Blue"],
    stock: 40,
    rating: 4.8,
    reviewsCount: 156,
    featured: true,
    isNew: false,
    discount: 28,
  },

  {
    name: "VK Essential Hoodie",
    brand: "VK FASHIONS",
    description:
      "Heavyweight comfortable hoodie designed for everyday streetwear.",
    price: 1999,
    oldPrice: 2999,
    category: "Hoodies",
    gender: "Unisex",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey"],
    stock: 30,
    rating: 4.9,
    reviewsCount: 210,
    featured: true,
    isNew: true,
    discount: 33,
  },

  {
    name: "VK Casual Cargo Pants",
    brand: "VK FASHIONS",
    description:
      "Relaxed cargo pants with multiple utility pockets and modern styling.",
    price: 1599,
    oldPrice: 2199,
    category: "Pants",
    gender: "Men",
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7",
    ],
    sizes: ["30", "32", "34", "36"],
    colors: ["Black"],
    stock: 45,
    rating: 4.5,
    reviewsCount: 76,
    featured: false,
    isNew: true,
    discount: 27,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("VK FASHIONS products added successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedProducts();
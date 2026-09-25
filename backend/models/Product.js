const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      default: "VK FASHIONS",
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "T-Shirts",
        "Shirts",
        "Jeans",
        "Pants",
        "Hoodies",
        "Jackets",
        "Dresses",
        "Kids",
      ],
    },

    gender: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids", "Unisex"],
    },

    images: [
      {
        type: String,
      },
    ],

sizes: [
  {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40"],
  },
],

    colors: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
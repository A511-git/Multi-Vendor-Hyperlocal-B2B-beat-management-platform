import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import crypto from "crypto";


export const Product = sequelize.define(
  "Product",
  {
    sku: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    paranoid: true, // soft delete
  }
);


Product.beforeCreate((product) => {
  if (!product.sku) {
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    product.sku = `PROD-${random}`;
  }
});
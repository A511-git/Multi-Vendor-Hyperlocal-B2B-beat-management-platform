import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const ProductImage = sequelize.define(
  "ProductImage",
  {
    productImageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    link: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(50),   // Product SKU (string)
      allowNull: false,
    },
  },
  {
    tableName: "product_images",
    timestamps: true,
    paranoid: true,
  }
);

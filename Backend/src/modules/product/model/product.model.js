import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";
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
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const b = this.getDataValue("sellerId");
        return b ? fromBinaryUUID(b) : null;
      },

      set(val) {
        if (!val) return;
        this.setDataValue("sellerId", toBinaryUUID(val));
      },
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
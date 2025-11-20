import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";
import { v4 as uuidv4 } from "uuid";

export const ProductImage = sequelize.define(
  "ProductImage",
  {
    productImageId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue() {
        return toBinaryUUID(uuidv4());
      },
      get() {
        const raw = this.getDataValue("productImageId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) {
        if (!value) return;
        this.setDataValue("productImageId", toBinaryUUID(value));
      },
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

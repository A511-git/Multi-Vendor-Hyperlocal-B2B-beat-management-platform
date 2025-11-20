import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";
import { v4 as uuidv4 } from "uuid";

export const ProductReview = sequelize.define(
  "ProductReview",
  {
    productReviewId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue() {
        return toBinaryUUID(uuidv4());
      },
      get() {
        const raw = this.getDataValue("productReviewId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) {
        if (!value) return;
        this.setDataValue("productReviewId", toBinaryUUID(value));
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("customerId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("customerId", toBinaryUUID(value));
      },
    },
  },
  {
    tableName: "product_reviews",
    timestamps: true,
    paranoid: true,
  }
);

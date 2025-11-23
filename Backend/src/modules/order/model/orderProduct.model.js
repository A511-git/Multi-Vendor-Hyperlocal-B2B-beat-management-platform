import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const OrderProduct = sequelize.define(
  "OrderProduct",
  {
    orderProductId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },

    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    vendorOrderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },

    totalDiscount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: { min: 0 },
    },

    finalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },

    acceptanceStatus: {
      type: DataTypes.ENUM(
        "fully accepted",
        "partially accepted",
        "rejected"
      ),
      defaultValue: "fully accepted",
    },
  },
  {
    tableName: "order_products",
    timestamps: true,
    paranoid: true,
  }
);

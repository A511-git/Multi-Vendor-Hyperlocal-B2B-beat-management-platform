import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define(
  "Order",
  {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "placed",
        "accepted",
        "dispatched",
        "out for delivery",
        "delivered",
        "returned",
        "cancelled"
      ),
      defaultValue: "placed",
    },

    paymentMethod: {
      type: DataTypes.ENUM("online", "offline"),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM("paid", "unpaid"),
      defaultValue: "unpaid",
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

    phone: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    paranoid: true,
  }
);

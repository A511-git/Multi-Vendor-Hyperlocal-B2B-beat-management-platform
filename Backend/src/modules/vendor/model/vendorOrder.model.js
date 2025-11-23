import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
export const VendorOrder = sequelize.define(
  "VendorOrder",
  {
    vendorOrderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    deliveryPersonId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    vendorId: {
      type: DataTypes.UUID,
      allowNull: false,
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

    vendorStatus: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "rejected",
        "packed",
        "ready for dispatch",
        "cancelled by user"
      ),
      defaultValue: "pending",
    },

    deliveryStatus: {
      type: DataTypes.ENUM(
        "pending",
        "pickup",
        "picked up",
        "out for delivery",
        "delivered",
        "failed delivery",
        "returned to vendor"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "vendor_orders",
    timestamps: true,
    paranoid: true,
  }
);

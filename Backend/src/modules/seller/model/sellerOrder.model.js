import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const SellerOrder = sequelize.define(
  "SellerOrder",
  {
    sellerOrderId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("sellerOrderId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("sellerOrderId", toBinaryUUID(value));
      },
    },

    orderId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("orderId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("orderId", toBinaryUUID(value));
      },
    },

    deliveryPersonId: {
      type: DataTypes.BLOB("medium"),
      allowNull: true,

      get() {
        const raw = this.getDataValue("deliveryPersonId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("deliveryPersonId", toBinaryUUID(value));
      },
    },

    sellerId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("sellerId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("sellerId", toBinaryUUID(value));
      },
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

    sellerStatus: {
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
        "returned to seller"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "seller_orders",
    timestamps: true,
    paranoid: true,
  }
);

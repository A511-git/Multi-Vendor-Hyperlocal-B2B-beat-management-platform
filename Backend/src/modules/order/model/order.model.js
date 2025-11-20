import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Order = sequelize.define(
  "Order",
  {
    orderId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("orderId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("orderId", toBinaryUUID(value));
      },
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

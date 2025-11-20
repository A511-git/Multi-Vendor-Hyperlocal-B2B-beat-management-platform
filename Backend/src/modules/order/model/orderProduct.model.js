import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const OrderProduct = sequelize.define(
  "OrderProduct",
  {
    orderProductId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      unique: true,
      allowNull: false,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("orderProductId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("orderProductId", toBinaryUUID(value));
      },
    },

    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    sellerOrderId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("sellerOrderId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("sellerOrderId", toBinaryUUID(value));
      },
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

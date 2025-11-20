import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const CustomerComplaint = sequelize.define(
  "CustomerComplaint",
  {
    customerComplaintId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("customerComplaintId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("customerComplaintId", toBinaryUUID(value));
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

    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    complaint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "customer_complaints",
    timestamps: true,
    paranoid: true,
  }
);

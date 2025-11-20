import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const CustomerComplaintImage = sequelize.define(
  "CustomerComplaintImage",
  {
    customerComplaintImageId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("customerComplaintImageId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("customerComplaintImageId", toBinaryUUID(value));
      },
    },

    customerComplaintId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("customerComplaintId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("customerComplaintId", toBinaryUUID(value));
      },
    },

    link: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "customer_complaint_images",
    timestamps: true,
    paranoid: true,
  }
);

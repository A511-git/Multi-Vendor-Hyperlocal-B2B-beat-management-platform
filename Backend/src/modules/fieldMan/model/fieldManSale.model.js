import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const FieldManSale = sequelize.define(
  "FieldManSale",
  {
    fieldManSaleId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      defaultValue() { return toBinaryUUID(uuidv4()); },
      get() {
        const raw = this.getDataValue("fieldManSaleId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("fieldManSaleId", toBinaryUUID(value)); }
    },

    fieldManId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("fieldManId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("fieldManId", toBinaryUUID(value)); }
    },

    storeId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("storeId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("storeId", toBinaryUUID(value)); }
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "closed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "fieldman_sales",
    timestamps: true,
    paranoid: true,
  }
);

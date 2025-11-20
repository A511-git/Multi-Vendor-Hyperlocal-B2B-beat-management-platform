import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const FieldManSaleOrder = sequelize.define(
  "FieldManSaleOrder",
  {
    fieldManSaleOrderId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      defaultValue() { return toBinaryUUID(uuidv4()); },
      get() {
        const raw = this.getDataValue("fieldManSaleOrderId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("fieldManSaleOrderId", toBinaryUUID(value)); }
    },

    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },

    fieldManSaleId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("fieldManSaleId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("fieldManSaleId", toBinaryUUID(value)); }
    },
  },
  {
    tableName: "fieldman_sale_orders",
    timestamps: true,
    paranoid: true,
  }
);

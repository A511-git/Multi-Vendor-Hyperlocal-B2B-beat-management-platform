import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const FieldManSaleOrder = sequelize.define(
  "FieldManSaleOrder",
  {
    fieldManSaleOrderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "fieldman_sale_orders",
    timestamps: true,
    paranoid: true,
  }
);

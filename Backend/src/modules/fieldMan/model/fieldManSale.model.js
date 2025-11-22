import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const FieldManSale = sequelize.define(
  "FieldManSale",
  {
    fieldManSaleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    fieldManId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
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

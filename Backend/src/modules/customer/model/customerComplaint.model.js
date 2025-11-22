import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const CustomerComplaint = sequelize.define(
  "CustomerComplaint",
  {
    customerComplaintId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,     
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
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

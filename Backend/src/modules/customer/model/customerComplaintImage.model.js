import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const CustomerComplaintImage = sequelize.define(
  "CustomerComplaintImage",
  {
    customerComplaintImageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    customerComplaintId: {
      type: DataTypes.UUID,
      allowNull: false,
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

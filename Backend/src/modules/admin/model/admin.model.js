import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Admin = sequelize.define(
  "Admin",
  {
    adminId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamps: true,
    paranoid: true,
  }
);

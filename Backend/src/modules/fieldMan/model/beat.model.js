import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Beat = sequelize.define(
  "Beat",
  {
    beatId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "beats",
    timestamps: true,
    paranoid: true,
  }
);

import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const FieldMan = sequelize.define(
  "FieldMan",
  {
    fieldManId: {
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

    phone: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "field_men",
    timestamps: true,
    paranoid: true,
  }
);

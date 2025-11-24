import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Store = sequelize.define(
  "Store",
  {
    storeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    beatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    storeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive", "blocked"),
        defaultValue: "active",
    },

    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "stores",
    timestamps: true,
    paranoid: true,
  }
);

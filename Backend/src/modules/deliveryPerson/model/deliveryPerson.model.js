import { sequelize } from "../../../db/sequalize/sequalize.js"; 
import { DataTypes } from "sequelize";

export const DeliveryPerson = sequelize.define(
  "DeliveryPerson",
  {
    deliveryPersonId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
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

    status: {
      type: DataTypes.ENUM("active", "inactive", "blocked"),
      defaultValue: "active",
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "delivery_persons",
    timestamps: true,
    paranoid: true,
  }
);

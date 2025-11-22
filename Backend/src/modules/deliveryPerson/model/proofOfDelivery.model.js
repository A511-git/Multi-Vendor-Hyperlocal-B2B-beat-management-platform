import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const ProofOfDelivery = sequelize.define(
  "ProofOfDelivery",
  {
    proofOfDeliveryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    link: {
      type: DataTypes.STRING(500),
      allowNull: true, // optional
    },

    signature: {
      type: DataTypes.ENUM("signed", "unsigned"),
      allowNull: true, // optional
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    deliveryPersonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "proof_of_delivery",
    timestamps: true,
    paranoid: true,
  }
);

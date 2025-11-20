import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const ProofOfDelivery = sequelize.define(
  "ProofOfDelivery",
  {
    proofOfDeliveryId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("proofOfDeliveryId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("proofOfDeliveryId", toBinaryUUID(value));
      },
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
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("orderId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("orderId", toBinaryUUID(value));
      },
    },

    deliveryPersonId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("deliveryPersonId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("deliveryPersonId", toBinaryUUID(value));
      },
    },
  },
  {
    tableName: "proof_of_delivery",
    timestamps: true,
    paranoid: true,
  }
);

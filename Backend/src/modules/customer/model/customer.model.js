import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Customer = sequelize.define(
  "Customer",
  {
    customerId: {
      type: DataTypes.BLOB("medium"), // BINARY(16)
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("customerId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("customerId", toBinaryUUID(value));
      },
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

    userId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("userId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("userId", toBinaryUUID(value));
      },
    },
  },
  {
    tableName: "customers",
    timestamps: true,
    paranoid: true,
  }
);

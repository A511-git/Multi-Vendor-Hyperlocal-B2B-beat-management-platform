import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Store = sequelize.define(
  "Store",
  {
    storeId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue() { return toBinaryUUID(uuidv4()); },
      get() {
        const raw = this.getDataValue("storeId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("storeId", toBinaryUUID(value)); }
    },

    beatId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("beatId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("beatId", toBinaryUUID(value)); }
    },

    storeName: {
      type: DataTypes.STRING(100),
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
  },
  {
    tableName: "stores",
    timestamps: true,
    paranoid: true,
  }
);

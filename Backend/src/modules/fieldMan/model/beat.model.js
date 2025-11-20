import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Beat = sequelize.define(
  "Beat",
  {
    beatId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("beatId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("beatId", toBinaryUUID(value));
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
  },
  {
    tableName: "beats",
    timestamps: true,
    paranoid: true,
  }
);

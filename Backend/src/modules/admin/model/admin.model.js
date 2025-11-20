import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Admin = sequelize.define(
  "Admin",
  {
    adminId: {
      type: DataTypes.BLOB("medium"),   // BINARY(16)
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("adminId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("adminId", toBinaryUUID(value));
      },
    },

    userId: {
      type: DataTypes.BLOB("medium"),   // FK → User.userId (binary)
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
    tableName: "admins",
    timestamps: true,
    paranoid: true,
  }
);

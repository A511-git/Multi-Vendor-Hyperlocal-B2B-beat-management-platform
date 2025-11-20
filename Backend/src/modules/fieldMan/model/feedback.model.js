import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const Feedback = sequelize.define(
  "Feedback",
  {
    feedbackId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      defaultValue() { return toBinaryUUID(uuidv4()); },
      get() {
        const raw = this.getDataValue("feedbackId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("feedbackId", toBinaryUUID(value)); }
    },

    storeId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("storeId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("storeId", toBinaryUUID(value)); }
    },

    fieldManId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("fieldManId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) { if (value) this.setDataValue("fieldManId", toBinaryUUID(value)); }
    },

    feedback: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    tableName: "feedbacks",
    timestamps: true,
    paranoid: true,
  }
);

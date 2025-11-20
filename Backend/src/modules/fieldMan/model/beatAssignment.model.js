import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const BeatAssignment = sequelize.define(
  "BeatAssignment",
  {
    beatAssignmentId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("beatAssignmentId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("beatAssignmentId", toBinaryUUID(value));
      },
    },

    beatId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("beatId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("beatId", toBinaryUUID(value));
      },
    },

    fieldManId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,

      get() {
        const raw = this.getDataValue("fieldManId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("fieldManId", toBinaryUUID(value));
      },
    },

    status: {
      type: DataTypes.ENUM("assigned", "unassigned"),
      defaultValue: "assigned",
      allowNull: false,
    },
  },
  {
    tableName: "beat_assignments",
    timestamps: true,
    paranoid: true,
  }
);

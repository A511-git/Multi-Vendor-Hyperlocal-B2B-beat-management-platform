import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const FieldManAttendance = sequelize.define(
  "FieldManAttendance",
  {
    fieldManAttendanceId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      unique: true,

      defaultValue() {
        return toBinaryUUID(uuidv4());
      },

      get() {
        const raw = this.getDataValue("attendanceId");
        return raw ? fromBinaryUUID(raw) : null;
      },

      set(value) {
        if (!value) return;
        this.setDataValue("attendanceId", toBinaryUUID(value));
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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    attendanceStatus: {
      type: DataTypes.ENUM("present", "absent"),
      allowNull: false,
      defaultValue: "present",
    },
  },
  {
    tableName: "field_man_attendance",
    timestamps: true,
    paranoid: true,
  }
);

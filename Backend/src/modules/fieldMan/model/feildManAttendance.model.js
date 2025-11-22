import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const FieldManAttendance = sequelize.define(
  "FieldManAttendance",
  {
    fieldManAttendanceId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    fieldManId: {
      type: DataTypes.UUID,
      allowNull: false,
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

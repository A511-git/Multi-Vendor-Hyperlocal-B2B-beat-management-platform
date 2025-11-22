import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const BeatAssignment = sequelize.define(
  "BeatAssignment",
  {
    beatAssignmentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    beatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fieldManId: {
      type: DataTypes.UUID,
      allowNull: false,
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

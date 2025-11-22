import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const VisitLog = sequelize.define(
  "VisitLog",
  {
    visitLogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    beatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fieldManId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    visited: {
      type: DataTypes.ENUM("visited", "unvisited"),
      defaultValue: "unvisited",
      allowNull: false,
    },

    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "visit_logs",
    timestamps: true,
    paranoid: true,
  }
);

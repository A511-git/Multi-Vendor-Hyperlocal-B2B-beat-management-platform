import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Feedback = sequelize.define(
  "Feedback",
  {
    feedbackId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

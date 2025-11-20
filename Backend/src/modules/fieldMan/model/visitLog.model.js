import { sequelize } from "../../../config/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const VisitLog = sequelize.define(
  "VisitLog",
  {
    visitLogId: {
      type: DataTypes.BLOB("medium"),
      primaryKey: true,
      allowNull: false,
      defaultValue() {
        return toBinaryUUID(uuidv4());
      },
      get() {
        const raw = this.getDataValue("visitLogId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) {
        if (!value) return;
        this.setDataValue("visitLogId", toBinaryUUID(value));
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

    storeId: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
      get() {
        const raw = this.getDataValue("storeId");
        return raw ? fromBinaryUUID(raw) : null;
      },
      set(value) {
        if (!value) return;
        this.setDataValue("storeId", toBinaryUUID(value));
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

import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";

export const User = sequelize.define("User", {
    userId: {
        type: DataTypes.BLOB("medium"),
        defaultValue() {
            return toBinaryUUID(uuidv4());
        },
        primaryKey: true,
        allowNull: false,
        unique: true,
        get() {
            const binary = this.getDataValue("userId");
            return binary ? fromBinaryUUID(binary) : null;
        },

        set(value) {
            if (!value) return;
            this.setDataValue("userId", toBinaryUUID(value));
        }
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },

    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 200],
        },
    },

    role: {
        type: DataTypes.ENUM("customer", "seller", "deliveryMan", "fieldMan", "admin"),
        defaultValue: "customer",
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    tableName: "users",
    timestamps: true,
    paranoid: true, // soft delete
    indexes: [
        {
            unique: true,
            fields: ["email"]
        }
    ]
});

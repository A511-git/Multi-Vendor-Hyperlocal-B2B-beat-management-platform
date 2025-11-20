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
}
)

User.beforeCreate(async (user) => {
    if (user.password)
        user.password = await bcrypt.hash(
            user.password,
            11
        )
})

User.beforeUpdate(async (user) => {
    if (user.changed("password"))
        user.password = await bcrypt.hash(
            user.password,
            11
        )
})

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

User.prototype.generateAccessToken = function () {
    return jwt.sign(
        {
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

User.prototype.genrateRefreshToken = function () {
    return jwt.sign(
        {
            userId: this.userId
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}
import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const User = sequelize.define("User", {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
        type: DataTypes.ENUM("customer", "vendor", "deliveryMan", "fieldMan", "admin"),
        defaultValue: "customer",
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    tableName: "users",
    timestamps: true,
    paranoid: true,

    defaultScope: {
        attributes: { exclude: ["password", "refreshToken"] }
    },

    scopes: {
        withSecret: {
            attributes: { include: ["password", "refreshToken"] }
        }
    },

    indexes: [
        {
            unique: true,
            fields: ["email"]
        }
    ]
}
);


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

User.prototype.generateRefreshToken = function () {
    return jwt.sign(
        {
            userId: this.userId
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}
import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";

export const Seller = sequelize.define("Seller", {
    sellerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    shopName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5,
        },
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
    {
        tableName: "sellers",
        timestamps: true,
        paranoid: true,
    }
)

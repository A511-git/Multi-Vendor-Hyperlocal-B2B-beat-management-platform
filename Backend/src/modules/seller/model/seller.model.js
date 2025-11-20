import { sequelize } from "../../../db/sequalize/sequalize.js";
import { DataTypes } from "sequelize";
import { User } from "../../user/model/User.model.js";
import { toBinaryUUID, fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor.js";
import { v4 as uuidv4 } from "uuid";


export const Seller = sequelize.define("Seller", {
    sellerId: {
        type: DataTypes.BLOB("medium"),
        defaultValue() {
            return toBinaryUUID(uuidv4());
        },
        primaryKey: true,
        allowNull: false,
        unique: true,
        get() {
            const binary = this.getDataValue("sellerId");
            return binary ? fromBinaryUUID(binary) : null;
        },
        set(value) {
            this.setDataValue("sellerId", toBinaryUUID(value));
        }
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
        type: DataTypes.BLOB("medium"),
        allowNull: false,
        get() {
            const binary = this.getDataValue("userId");
            return binary ? fromBinaryUUID(binary) : null;
        },

        set(value) {
            this.setDataValue("userId", toBinaryUUID(value));
        }
    }
},
    {
        tableName: "sellers",
        timestamps: true,
        paranoid: true,
    }
)

import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserProductAttributes {
    id?: number;
    userId: number;
    productId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class UserProduct extends Model<UserProductAttributes> implements UserProductAttributes {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


const UserProductModel = (sequelize: Sequelize): typeof UserProduct => {
    UserProduct.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        }
    },
        {
            sequelize,
            modelName: "UserProduct",
            tableName: 'user_products',
            timestamps: true
        }
    )
    return UserProduct;
}

export default UserProductModel;
export  { UserProduct };
import { DataTypes, Model, Sequelize } from "sequelize";

interface ProductAttributes {
    id?: number;
    name: string,
    description: string;
    price: number;
    stockQuantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stockQuantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date
}

const ProductModel = (sequelize: Sequelize): typeof Product => {
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'products',
        timestamps: true
    })
    return Product;
}

export default ProductModel;


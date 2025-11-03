import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "admin" | "user" | "customer";
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string
    public lastName!: string;
    public role!: "admin" | "user" | "customer";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const userModel = (sequelize: Sequelize): typeof User => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user", "customer"),
            allowNull: false,
            defaultValue: "user"
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: true
    })

    return User;
}

export default userModel;
export { User };


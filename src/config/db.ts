import { Sequelize } from 'sequelize';
import initUser from '../models/user.model';
import initProduct from '../models/product.model';

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: "mysql", // ✅ use mysql2 since it's installed
        logging: false
    }
);

const db: any = {
    Sequelize,
    sequelize,
    User: initUser(sequelize),
    Product: initProduct(sequelize)
};

sequelize.authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error('Error connecting DB', err));

// sequelize.sync({ alter: true })
//     .then(() => console.log("Models synchronized"))
//     .catch((err) => console.error(err));

export default db;


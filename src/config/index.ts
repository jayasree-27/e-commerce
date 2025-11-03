import sequelize from "./db";
import userModel, { User } from "../models/user.model";
import productModel, { Product } from "../models/product.model";
import UserProductModel, { UserProduct } from "../models/userProduct.model";

userModel(sequelize);
productModel(sequelize);
UserProductModel(sequelize);

User.belongsToMany(Product, {
  through: UserProduct,
  foreignKey: "userId",
  as: "products",
});

Product.belongsToMany(User, {
  through: UserProduct,
  foreignKey: "productId",
  as: "users",
});

export { sequelize, User, Product, UserProduct };

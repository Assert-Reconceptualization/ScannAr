/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

module.exports = function(app) {
  // getting the config for sequelize
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    },
  );

  // // eslint-disable-next-line no-unused-vars
  products.associate = function (models) {
    // many to many relationship
    products.belongsToMany(models.users, { through: "savedProducts", foreignKey: "idProduct" });
    products.belongsToMany(models.tags, { through: "productTags", foreignKey: "idProduct" });
  };

  return products;
};

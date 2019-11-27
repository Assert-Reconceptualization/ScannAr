/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const { sequelize } = Sequelize
const { DataTypes } = Sequelize;

module.exports = function(app) {
  // getting the config for sequelize
  const sequelizeClient = app.get("sequelizeClient");
  const products = sequelizeClient.define(
    "products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: "TIMESTAMP",
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true
      },
      updatedAt: {
        type: "TIMESTAMP",
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  products.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // will create a relationship for bussinessID field
    // products.hasMany(models)
  };

  return products;
};

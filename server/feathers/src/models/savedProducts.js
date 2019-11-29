/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

module.exports = function (app) {
  // getting the config for sequelize
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define(
    'SavedProducts',
    {
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

  return products;
};

/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

module.exports = function (app) {
  // getting the config for sequelize
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      nameFirst: {
        type: DataTypes.STRING,
      },
      nameLast: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
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

  users.associate = function (models) {
    users.belongsToMany(models.products, { through: "savedProducts", foreignKey: "idUser"});
    users.hasMany(models.products, { foreignKey: 'idBusiness' });
  };
  return users;
};

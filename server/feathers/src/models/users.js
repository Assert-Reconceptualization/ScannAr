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
      googleId: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      nameFirst: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nameLast: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idBusiness: {
        type: DataTypes.INTEGER,
      },
      // will create a relationship for bussinessID field
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // // eslint-disable-next-line no-unused-vars
  // users.associate = function (models) {
  // };
  return users;
};

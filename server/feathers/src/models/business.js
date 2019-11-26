/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const user = require('./users');

const { DataTypes } = Sequelize;

module.exports = function(app) {
  // getting the config for sequelize
  const sequelizeClient = app.get("sequelizeClient");
  const business = sequelizeClient.define(
    "business",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.FLOAT(10),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // will create a relationship for businessID fields in product and user
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
  business.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // will create a relationship for bussinessID field
    business.hasMany(models.users, { foreginKey: 'idBussiness' });
  };

  return business;
};

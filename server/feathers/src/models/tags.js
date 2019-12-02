/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

module.exports = function(app) {
  // getting the config for sequelize
  const sequelizeClient = app.get("sequelizeClient");
  const tags = sequelizeClient.define(
    "tags",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

  tags.associate = function(models) {

  };
  return tags;
};

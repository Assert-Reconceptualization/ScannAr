// /* eslint-disable no-param-reassign */
// // See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// // for more of what you can do here.
// const Sequelize = require("sequelize");

// const { DataTypes } = Sequelize;

// module.exports = function(app) {
//   // getting the config for sequelize
//   const sequelizeClient = app.get("sequelizeClient");
//   const business = sequelizeClient.define(
//     "business",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       hooks: { 
//         beforeCount(options) {
//           options.raw = true;
//         }
//       }
//     }
//   );
//   // eslint-disable-next-line no-unused-vars
//   business.associate = function(models) {
//     business.hasMany(models.products, { foreignKey: 'idBusiness' });
//   };

//   return business;
// };

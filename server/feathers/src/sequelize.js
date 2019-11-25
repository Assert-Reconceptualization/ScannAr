const Sequelize = require('sequelize');

module.exports = (app) => {
  const connectionString = app.get('postgres');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    database: 'ScannAr',
    logging: false,
    define: {
      freezeTableName: true, // Model tableName will be the same as the model name
    },
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync({force: true}).then(() => {
      console.log('connected to database');
    }).error((err) =>{
      console.log(`Error: ${err}`);
    }));

    return result;
  };
};

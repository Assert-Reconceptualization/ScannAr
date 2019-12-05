const Sequelize = require('sequelize');

module.exports = (app) => {
  const sequelize = new Sequelize('scannar', 'postgres', 'scannar', {
    dialect: 'postgres',
    // e.g. host: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
    host: '/cloudsql/scannar-server-second:us-central1:scannar',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
      // same as host string above
      socketPath: '/cloudsql/scannar-server-second:us-central1:scannar',
    },
    logging: false,
    operatorsAliases: false,
  });
  // const connectionString = app.get("postgres");
  // const sequelize = new Sequelize(connectionString, {
  //   dialect: "postgres",
  //   database: "ScannAr",
  //   logging: false,
  //   define: {
  //     freezeTableName: true, // Model tableName will be the same as the model name
  //   },
  // });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);
    const { models } = sequelize;
    // Set up data relationships
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });
    // Sync to the database
    app.set(
      'sequelizeSync',
      sequelize
        .sync({ force: true })
        .then(() => {
          console.log('connected to database');
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        }),
    );
    return result;
  };
};

const Sequelize = require('sequelize');

module.exports = (app) => {
  // const sequelize = new Sequelize('scannar', 'postgres', 'scannar', {
  //   dialect: 'postgres',
  //   // e.g. host: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
  //   host: '/cloudsql/scannar-server-second:us-central1:scannar',
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000,
  //   },
  //   dialectOptions: {
  //     // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
  //     // same as host string above
  //     socketPath: '/cloudsql/scannar-server-second:us-central1:scannar',
  //   },
  //   logging: false,
  //   operatorsAliases: false,
  // });
  const connectionString = app.get("postgres");
  const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    database: "ScannAr",
    logging: false,
    define: {
      freezeTableName: true, // Model tableName will be the same as the model name
    },
  });
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
        // .then(() => {
        //   models.business.create({
        //     name: 'Big Baller Brand',
        //     phone: '3127735041',
        //     email: 'BBB01@gmail.com',
        //     description: 'Top players to ever play in the NBA',
        //     password: 'lavar',
        //   }).then((business) => {
        //     business.createProduct({
        //       name: 'Flag',
        //       price: 10,
        //       description: 'Wow, so American',
        //       imageUrl: 'https://i.ibb.co/yXVGX37/American-Flag.jpg',
        //     });
        //     business.createProduct({
        //       name: 'Cabinet',
        //       price: 1000,
        //       description: 'This is a big blue cabinet',
        //       imageUrl: 'https://i.ibb.co/qWf8pm0/Cabinet.jpg',
        //     });
        //     business.createProduct({
        //       name: 'Beanbag',
        //       price: 10000,
        //       description: 'The big beanbag',
        //       imageUrl: 'https://i.ibb.co/vmYH8TN/IMG-6066.jpg',
        //     });
        //   });
        // })
        // .then(() => {
        //   models.users.create({
        //     password: '231321',
        //     email: 'abel@scannar',
        //     nameFirst: 'abel',
        //     nameLast: 'jade',
        //   });
        // })
        .catch((err) => {
          console.log(`Error: ${err}`);
        }),
    );
    return result;
  };
};

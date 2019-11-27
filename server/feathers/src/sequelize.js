const Sequelize = require('sequelize');
const getProducts  = require('./models/products')
const getUsers  = require('./models/users')
const getBusiness  = require('./models/business')

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
    const { models } = sequelize;

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);
    const { models } = sequelize;
    // Set up data relationships
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // requiring models
    const products = getProducts(app);
    const users = getUsers(app);
    const business = getBusiness(app);


    // Sync to the database
    app.set('sequelizeSync', sequelize.sync({force: true})
    .then(() => {
      console.log('connected to database');
    })
    .then(() => {
      products
        .create({
          name: "Flag",
          price: 10,
          description: "Wow, so American",
          imageUrl: '"https://i.ibb.co/yXVGX37/American-Flag.jpg'
        })
        .then(() => {
          console.log("mock data created");
        })
        .catch(err => {
          console.log(err);
        });
        products.create({
          name: "Cabinet",
          price: 1000,
          description: "This is a big blue cabinet",
          imageUrl: "https://i.ibb.co/qWf8pm0/Cabinet.jpg"
        });
        users.create({
          idGoogle: 54643,
          role: 'customer',
          email: 'abel.terefe@gmail.com',
          nameFirst: "Abel",
          nameLast: "Terefe",
        });
        users.create({
          idGoogle: 5675443,
          role: 'business',
          email: 'Samsonterefe96@gmail.com',
          nameFirst: "Samson",
          nameLast: "Terefe",
        });
        business
          .create({
            name: "Big Baller Brand",
            phone: 3127735041,
            email: "BBB01@gmail.com",
            description: "Top players to ever play in the NBA"
          })
          .then(() => {
            console.log('bussiness worked')
          })
          .catch(err => {
            console.log(err);
          });
    })
    .catch((err) =>{
      console.log(`Error: ${err}`);
    }));

    return result;
  };
};

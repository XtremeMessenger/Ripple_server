const path = require('path');
const config = require(__dirname + './config.json')[env];

// your config file will be in your directory
const db = new Sequelize(config.database, config.username, config.password, {
   host: '****.****.us-west-1.rds.amazonaws.com',
   port: 5432,
   logging: console.log,
   maxConcurrentQueries: 100,
   dialect: 'postgres',
   dialectOptions: {
       ssl:'Amazon RDS'
   },
   pool: { maxConnections: 5, maxIdleTime: 30},
   language: 'en'
})


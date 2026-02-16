require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
'furnitureapp',
'root',
'qwerty',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

const services = require('./models/services')(sequelize, Sequelize.DataTypes);
const serviceimages = require('./models/serviceImages')(sequelize, Sequelize.DataTypes);

if (require.main === module) {
  sequelize.sync({ force: true }).then(() => {
    console.log('Tables created!');
    process.exit();
  });
}

module.exports = { sequelize, models: sequelize.models };
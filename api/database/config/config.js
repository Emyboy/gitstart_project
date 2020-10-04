require('dotenv').config();

console.log({
  dev: process.env.DEV_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  prod: process.env.DATABASE_URL
})

module.exports = {
  development: {
    url: `${process.env.DEV_DATABASE_URL}`,
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: `${process.env.TEST_DATABASE_URL}`,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: `${process.env.DATABASE_URL}`,
    dialect: 'postgres',
    logging: false
  },
};

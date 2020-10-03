'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(90),
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      avatar_url: {
        type: Sequelize.STRING(999),
        validate: {
          isUrl: true
        },
        defaultValue: 'https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+men+people+person+profile+user+users-1320196163635839021.png'
      },
      followrs: {
        type: Sequelize.INTEGER(),
        defaultValue: 0,
      },
      following: {
        type: Sequelize.INTEGER(),
        defaultValue: 0,
      },
      about: {
        type: Sequelize.STRING(140),
        allowNull: true
      },
      banner_url: {
        type: Sequelize.STRING(999),
        defaultValue: 'https://acttoronto.com/wp-content/uploads/2015/09/Blue-Banner.jpg',
        validate: {
          isUrl: true
        }
      },
      genter: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
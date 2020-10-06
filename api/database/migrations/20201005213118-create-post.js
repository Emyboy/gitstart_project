'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
        // references: {
        //   model: 'Users',
        //   key: 'id',
        //   as: 'id'
        // }
      },
      caption: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(999),
        allowNull: false,
        validate: {
          isUrl: true
        }
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
    return queryInterface.dropTable('Posts');
  }
};
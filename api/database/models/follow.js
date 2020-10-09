'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Follow.associate = function (models) {
    // associations can be defined here
    Follow.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelelte: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Follow;
};
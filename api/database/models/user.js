'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(999),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING(999),
      validate: {
        isUrl: true
      },
      defaultValue: 'https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+men+people+person+profile+user+users-1320196163635839021.png'
    },
    about: {
      type: DataTypes.STRING(140),
      allowNull: true
    },
    banner_url: {
      type: DataTypes.STRING(999),
      defaultValue: 'https://acttoronto.com/wp-content/uploads/2015/09/Blue-Banner.jpg',
      validate: {
        isUrl: true
      }
    },
    gender: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
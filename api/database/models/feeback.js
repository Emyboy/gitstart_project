'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feeback = sequelize.define('Feeback', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Feeback.associate = function(models) {
    // associations can be defined here
  };
  return Feeback;
};
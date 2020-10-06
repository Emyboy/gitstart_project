'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING(200),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(999),
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
  }, {});
  Post.associate = (models) => {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  };
  return Post;
};
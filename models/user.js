'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: {
          name: "id_user",
          as: "todos",
        },
      })
      User.belongsTo(models.Level, {
        foreignKey: {
          name: "id_level",
          as: "levels",
        },
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    id_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
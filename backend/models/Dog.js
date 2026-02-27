module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Dog;
};

module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define(
    "Services",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("lamp", "chair", "table", "sofa", "bed", "other"),
        allowNull: false,
      },
    },
    {
      tableName: "services",
      freezeTableName: true,
      timestamps: false,
    }
  );

  Services.associate = (models) => {
    Services.hasMany(models.ServiceImages, {
      foreignKey: "serviceId",
      as: "images",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return Services;
};
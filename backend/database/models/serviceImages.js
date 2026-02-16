module.exports = (sequelize, DataTypes) => {
  const ServiceImages = sequelize.define(
    "ServiceImages",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "service_images",
      freezeTableName: true,
      timestamps: false,
      indexes: [{ fields: ["serviceId"] }],
    }
  );

  ServiceImages.associate = (models) => {
    ServiceImages.belongsTo(models.Services, {
      foreignKey: "serviceId",
      as: "service",
      onDelete: "CASCADE",
    });
  };

  return ServiceImages;
};

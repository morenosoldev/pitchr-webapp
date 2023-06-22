"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      jobTitle: {
        type: Sequelize.STRING,
      },
      jobDescription: {
        type: Sequelize.STRING,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      equity: {
        type: DataTypes.INTEGER,
      },
      BusinessUserId: {
        type: DataTypes.INTEGER,
      },
      linkedIn: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Employees");
  },
};

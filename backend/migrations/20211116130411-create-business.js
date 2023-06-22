"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Businesses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      cvr: {
        type: Sequelize.INTEGER,
      },
      industry: {
        type: Sequelize.STRING,
      },
      goal: {
        type: Sequelize.STRING,
      },
      development_stage: {
        type: Sequelize.STRING,
      },
      percentage: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("Businesses");
  },
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      business_name: {
        type: Sequelize.STRING
      },
      business_cvr: {
        type: Sequelize.INTEGER
      },
      industry: {
        type: Sequelize.STRING
      },
      development_stage: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      profile_visits: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Businesses');
  }
};
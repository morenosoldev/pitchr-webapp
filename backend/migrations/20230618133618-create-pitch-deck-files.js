"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PitchDeckFiles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pitchDeckId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PitchDecks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("PitchDeckFiles", ["pitchDeckId"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("PitchDeckFiles", ["pitchDeckId"]);
    await queryInterface.dropTable("PitchDeckFiles");
  },
};

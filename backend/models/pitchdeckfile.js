"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PitchDeckFile extends Model {
    static associate(models) {
      this.belongsTo(models.PitchDeck, {
        foreignKey: "pitchDeckId",
        as: "pitchDeck",
      });
    }
  }

  PitchDeckFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: DataTypes.STRING,
      pitchDeckId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PitchDeckFile",
    }
  );

  return PitchDeckFile;
};

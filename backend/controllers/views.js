const models = require("../models");
const ProfileViews = models.ProfileViews;
const PitchViews = models.PitchViews;
const DeckViews = models.DeckViews;
const moment = require("moment"); //<es6
const { Op } = require("sequelize");

const addProfileView = async (req, res) => {
  const { userID, visitorID } = req.params;

  try {
    ProfileViews.create({
      user_id: userID,
      visitor_user_id: visitorID,
      count: 0,
    });

    res.status(200).json("tilføjet");
  } catch (error) {
    res.status(500).json(error);
  }
};

const addDeckView = async (req, res) => {
  const { deckID, visitorID } = req.params;

  try {
    DeckViews.create({
      deckId: deckID,
      visitor_user_id: visitorID,
    });

    res.status(200).json("tilføjet");
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPitchView = async (req, res) => {
  const { userID, visitorID } = req.params;

  try {
    PitchViews.create({
      user_id: userID,
      view_user_id: visitorID,
      count: 0,
    });

    res.status(200).json("tilføjet");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPitchViews = async (req, res) => {
  const { id } = req.params;
  const views = [];

  try {
    const pitchViews = await PitchViews.findAll({
      where: {
        user_id: id,
        createdAt: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
      raw: true,
    });

    const dates = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    let preFilled = [
      { count: 0, updatedAt: dates[6].toDateString() },
      { count: 0, updatedAt: dates[5].toDateString() },
      { count: 0, updatedAt: dates[4].toDateString() },
      { count: 0, updatedAt: dates[3].toDateString() },
      { count: 0, updatedAt: dates[2].toDateString() },
      { count: 0, updatedAt: dates[1].toDateString() },
      { count: 0, updatedAt: dates[0].toDateString() },
    ];

    const days = [
      "Monday",
      "Tuesday",
      "Wednsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const result = pitchViews.reduce((acc, current) => {
      const { createdAt } = current;
      const existing = acc.find(
        (a) =>
          new Date(a.createdAt).toISOString().slice(0, 10) ===
          new Date(createdAt).toISOString().slice(0, 10)
      );
      if (existing) {
        existing.updatedAt = new Date(existing.createdAt).toDateString();
        existing.id = new Date(existing.createdAt).getDay() - 1;
        existing.count += 1;
        var index = preFilled.findIndex(
          (item) =>
            item.updatedAt == new Date(existing.createdAt).toDateString()
        );
        if (index > 0) {
          preFilled[index].count = existing.count;
        }
      } else {
        current.count = 1;
        current.updatedAt = new Date(createdAt).toDateString();
        current.id = new Date(createdAt).getDay();
        var index = preFilled.findIndex(
          (item) => item.updatedAt == new Date(createdAt).toDateString()
        );
        if (index > 0) {
          preFilled[index].count = current.count;
        }

        acc.push(current);
      }

      return acc;
    }, []);

    var index = result
      .map(function (e) {
        return e.updatedAt;
      })
      .indexOf("Nick");
    /*
     for(let i = 0; i < result.length; i++){
        

         
         
         //if(preFilled[result[i].id].updatedAt == result[i].updatedAt)
             preFilled[result[i].id] = result[i];
     }
*/

    res.status(200).json(preFilled);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProfileViews = async (req, res) => {
  const { id } = req.params;
  const views = [];

  try {
    const profileViews = await ProfileViews.findAll({
      where: {
        user_id: id,
        createdAt: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
      raw: true,
    });

    const dates = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    let preFilled = [
      { count: 0, updatedAt: dates[6].toDateString() },
      { count: 0, updatedAt: dates[5].toDateString() },
      { count: 0, updatedAt: dates[4].toDateString() },
      { count: 0, updatedAt: dates[3].toDateString() },
      { count: 0, updatedAt: dates[2].toDateString() },
      { count: 0, updatedAt: dates[1].toDateString() },
      { count: 0, updatedAt: dates[0].toDateString() },
    ];

    const days = [
      "Monday",
      "Tuesday",
      "Wednsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const result = profileViews.reduce((acc, current) => {
      const { createdAt } = current;
      const existing = acc.find(
        (a) =>
          new Date(a.createdAt).toISOString().slice(0, 10) ===
          new Date(createdAt).toISOString().slice(0, 10)
      );
      if (existing) {
        existing.updatedAt = new Date(existing.createdAt).toDateString();
        existing.id = new Date(existing.createdAt).getDay() - 1;
        existing.count += 1;
        var index = preFilled.findIndex(
          (item) =>
            item.updatedAt == new Date(existing.createdAt).toDateString()
        );
        if (index > 0) {
          preFilled[index].count = existing.count;
        }
      } else {
        current.count = 1;
        current.updatedAt = new Date(createdAt).toDateString();
        current.id = new Date(createdAt).getDay() - 1;
        var index = preFilled.findIndex(
          (item) => item.updatedAt == new Date(createdAt).toDateString()
        );
        if (index > 0) {
          preFilled[index].count = current.count;
        }

        acc.push(current);
      }

      return acc;
    }, []);

    res.status(200).json(preFilled);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addPitchView,
  addDeckView,
  addProfileView,
  getPitchViews,
  getProfileViews,
};

const models = require("../models");
const Business = models.Business;
const User = models.User;
const Markets = models.Market;
const Industry = models.Industry;
const Competence = models.Competence;

const PreviousInvestment = models.PreviousInvestment;
const Investor = models.Investor;
const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const res = require("express/lib/response");

const getAllUsers = async (req, res) => {
  try {
    const businesses = await sequelize.query(
      `
    SELECT Businesses.*, Users.profile_pic
    FROM Businesses
    INNER JOIN Users ON Businesses.user_id=Users.id;
`,
      { type: QueryTypes.SELECT }
    );

    const investors = await sequelize.query(
      `
SELECT Investors.*, Users.profile_pic, Users.name
FROM Investors
INNER JOIN Users ON Investors.user_id=Users.id;
`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json([...businesses, ...investors]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateMarkets = async (req, res) => {
  const { id } = req.params;

  try {
    await Investor.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.Market.destroy({
        where: {
          user_id: user.id,
        },
      });

      req.body.markets.map(async (market) => {
        await user.createMarket(market);
      });

      res.status(200).json(req.body.markets);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateBusinessMarkets = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Business.findOne({
      where: {
        id: id,
      },
    });

    user.location = req.body.location;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updatePreviousInvestments = async (req, res) => {
  const { id } = req.params;
  try {
    await Investor.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.PreviousInvestment.destroy({
        where: {
          user_id: user.id,
        },
      });

      req.body.previousInvestments.map(async (market) => {
        await user.createPreviousInvestment(market);
      });

      res.status(200).json(req.body.previousInvestments);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const getChatProfile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
    },
    raw: true,
  });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json("No user found.");
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  User.findOne({
    where: {
      id: id,
    },
    raw: true,
  })
    .then(async (dbUser) => {
      if (!dbUser) {
        return res.status(500).json({ message: "User not found" });
      } else {
        const bussiness = await Business.findOne({
          where: {
            user_id: dbUser.id,
          },
          raw: true,
        });

        return res
          .status(200)
          .json({
            user: { ...bussiness, ...dbUser, id: bussiness.id, user_id: id },
          });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const getBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const Profile = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Business,
          include: [
            {
              model: Competence,
              as: "competences",
            },
          ],
        },
      ],
    });
    res.status(200).json(Profile);
  } catch (err) {
    console.log("error", err);
    res.status(500).json(err);
  }
};

const getInvestor = async (req, res) => {
  const { id } = req.params;

  User.findOne({
    where: {
      id: id,
    },
    raw: true,
  })
    .then(async (dbUser) => {
      if (!dbUser) {
        return res.status(500).json({ message: "User not found" });
      } else {
        const bussiness = await Investor.findOne({
          where: {
            user_id: dbUser.id,
          },
          raw: true,
        });

        return res
          .status(200)
          .json({
            user: { ...bussiness, ...dbUser, id: bussiness.id, user_id: id },
          });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const updateInvestmentInterest = async (req, res) => {
  const { id } = req.params;
  try {
    await Investor.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.InvestmentInterest.destroy({
        where: {
          user_id: user.id,
        },
      });

      req.body.investmentInterests.map(async (market) => {
        await user.createInvestmentInterest(market);
      });

      res.status(200).json(req.body.investmentInterests);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateIndustrys = async (req, res) => {
  const { id } = req.params;
  try {
    await Investor.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.Industry.destroy({
        where: {
          user_id: user.id,
        },
      });

      req.body.industrys.map(async (market) => {
        await user.createIndustry(market);
      });

      res.status(200).json(req.body.industry);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateBusinessIndustrys = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Business.findOne({
      where: {
        user_id: id,
      },
    });

    user.industry = req.body.industry;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateInvestorCompetences = async (req, res) => {
  const { id } = req.params;
  try {
    await Investor.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.Competence.destroy({
        where: {
          user_id: user.id,
        },
      });

      req.body.competences.map(async (competence) => {
        await user.createCompetence(competence);
      });

      res.status(200).json(req.body.competences);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateCompetences = async (req, res) => {
  const { id } = req.params;
  try {
    await Business.findOne({
      where: {
        user_id: id,
      },
    }).then(async (user) => {
      await models.Competence.destroy({
        where: {
          user_id: id,
        },
      });

      req.body.competences.map(async (competence) => {
        await user.createCompetence(competence);
      });

      res.status(200).json(req.body.competences);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateCalendly = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Business.findOne({
      where: {
        user_id: id,
      },
    });

    user.calendly = req.body.calendly;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    user.profile_pic = req.body.picture;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    user.description = req.body.description;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Business.findOne({
      where: {
        user_id: id,
      },
    });

    user.location = req.body.location;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateCapital = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Investor.findOne({
      where: {
        user_id: id,
      },
    });

    user.available_capital = req.body.capital;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateDevelopmentStage = async (req, res) => {
  const { id } = req.params;

  try {
    const business = await Business.findOne({
      where: {
        user_id: id,
      },
    });

    business.development_stage = req.body.development_stage;
    await business.save();

    res.status(200).json(business);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

const updateCapitalGoal = async (req, res) => {
  const { id } = req.params;
  const { goal, percentage } = req.body;

  try {
    const business = await Business.findOne({
      where: {
        user_id: id,
      },
    });

    business.goal = goal;
    business.percentage = percentage;
    await business.save();

    res.status(200).json(business);
  } catch (error) {
    console.log(error);
    res.status(500).json("Can't find user");
  }
};

module.exports = {
  getInvestor,
  getBusiness,
  updateBusinessIndustrys,
  updateBusinessMarkets,
  updateLocation,
  getChatProfile,
  updateProfilePicture,
  updateCalendly,
  updateCapital,
  updateInvestorCompetences,
  updateInvestmentInterest,
  updateIndustrys,
  updatePreviousInvestments,
  updateMarkets,
  getUser,
  updateCapitalGoal,
  updateCompetences,
  updateDevelopmentStage,
  getAllUsers,
  updateDescription,
};

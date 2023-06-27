const models = require("../models");
const Business = models.Business;
const User = models.User;
const Competence = models.Competence;
const Investor = models.Investor;

const updateMarkets = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Investor.findOne({
      where: {
        user_id: id,
      },
    });

    if (user) {
      await models.Market.destroy({
        where: {
          user_id: id,
        },
      });

      await Promise.all(
        req.body.markets.map(async (market) => {
          await user.createMarket(market);
        })
      );

      res.status(200).json(req.body.markets);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePreviousInvestments = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Investor.findOne({
      where: {
        user_id: id,
      },
    });

    if (user) {
      await models.PreviousInvestment.destroy({
        where: {
          user_id: id,
        },
      });

      await Promise.all(
        req.body.previousInvestments.map(async (market) => {
          await user.createPreviousInvestment(market);
        })
      );

      res.status(200).json(req.body.previousInvestments);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dbUser = await User.findOne({ where: { id }, raw: true });

    if (!dbUser) {
      return res.status(500).json({ message: "User not found" });
    }

    let user = null;

    if (dbUser.type === "Business") {
      user = await User.findOne({
        where: {
          id: dbUser.id,
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

      const business = {
        ...user.Business.dataValues,
        competences: user.Business.competences.map(
          (competence) => competence.dataValues
        ),
      };

      formattedUser = {
        ...user.dataValues,
        ...business,
        id: business.user_id,
        user_id: user.id,
      };
    } else if (dbUser.type === "Investor") {
      user = await User.findOne({
        where: {
          id: dbUser.id,
        },
        include: [
          {
            model: Investor,
            include: [
              {
                model: Market,
                as: "markets",
              },
              {
                model: PreviousInvestment,
                as: "previousInvestments",
              },
              {
                model: Competence,
                as: "competences",
              },
            ],
          },
        ],
      });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    return res.status(200).json({ ...user.Investor.dataValues });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
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

        return res.status(200).json({
          user: { ...bussiness, ...dbUser, id: bussiness.id, user_id: id },
        });
      }
    })
    .catch((err) => {});
};

const updateInvestmentInterest = async (req, res) => {
  const { id } = req.params;
  const { investmentInterests } = req.body;

  try {
    const user = await Investor.findOne({
      where: {
        user_id: id,
      },
    });

    if (user) {
      await models.InvestmentInterest.destroy({
        where: {
          user_id: id,
        },
      });

      await Promise.all(
        investmentInterests.map(async (market) => {
          await user.createInvestmentInterest(market);
        })
      );

      res.status(200).json(investmentInterests);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIndustries = async (req, res) => {
  const { id } = req.params;
  const { industrys } = req.body;

  try {
    const user = await Investor.findOne({
      where: {
        user_id: id,
      },
    });

    if (user) {
      await models.Industry.destroy({
        where: {
          user_id: id,
        },
      });

      await Promise.all(
        industrys.map(async (industry) => {
          await user.createIndustry(industry);
        })
      );

      res.status(200).json(industrys);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
          user_id: id,
        },
      });

      req.body.competences.map(async (competence) => {
        await user.createCompetence(competence);
      });

      res.status(200).json(req.body.competences);
    });
  } catch (error) {
    console.log("err", error);
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
    res.status(500).json("Can't find user");
  }
};

const updateCapital = async (req, res) => {
  const { id } = req.params;
  const { capital } = req.body;
  const authenticatedUserId = req.user.id;

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.id !== authenticatedUserId) {
      return res.status(401).json("Unauthorized"); // Return unauthorized if the authenticated user is not the same as the ID provided
    }

    if (user.type === "business") {
      const business = await Business.findOne({
        where: {
          user_id: id,
        },
      });

      if (!business) {
        return res.status(404).json("Business not found");
      }

      business.goal = capital;
      await business.save();

      return res.status(200).json(business);
    } else if (user.type === "Investor") {
      const investor = await Investor.findOne({
        where: {
          user_id: id,
        },
      });
      investor.available_capital = capital;
      await investor.save();

      return res.status(200).json("Investor profile updated");
    } else {
      return res.status(400).json("Invalid user type");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
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
    res.status(500).json("Can't find user");
  }
};

module.exports = {
  getInvestor,
  getBusiness,
  updateBusinessIndustrys,
  updateLocation,
  updateProfilePicture,
  updateCalendly,
  updateCapital,
  updateInvestorCompetences,
  updateInvestmentInterest,
  updateIndustries,
  updatePreviousInvestments,
  updateMarkets,
  getUser,
  updateCapitalGoal,
  updateCompetences,
  updateDevelopmentStage,
  updateDescription,
};

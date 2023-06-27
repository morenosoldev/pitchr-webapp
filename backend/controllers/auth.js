const nodemailer = require("../config/nodemailer.config");
const db = require("../models");
const User = db.User;
const Invitation = db.invitation;
const Business = db.Business;
const Investor = db.Investor;
const Competence = db.Competence;
const FileRequest = db.filerequest;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.request_access = async (req, res) => {
  res.status(200).json({
    message:
      "Invitation has been sent! Please check your email, in a couple of days.",
  });
};

exports.request_file_access = async (req, res) => {
  const requestUser = await FileRequest.findOne({
    where: {
      user_id: req.body.id,
    },
  });

  if (!requestUser) {
    const token = jwt.sign(
      { id: req.body.user_id + " " + req.body.id },
      "secret"
    );

    const receiverUser = await User.findOne({
      where: {
        id: req.body.user_id,
      },
      raw: true,
    });

    const sender = await User.findOne({
      where: {
        id: req.body.id,
      },
      raw: true,
    });

    FileRequest.create({
      user_id: req.body.id,
      request_user_id: req.body.user_id,
      user_email: receiverUser.email,
      request_email: sender.email,
      token: token,
    });

    nodemailer.sendFileRequest(
      receiverUser.email,
      sender.name,
      receiverUser.name,
      token
    );

    res.status(200).json({
      message:
        "Invitation has been sent! Please check your email, in a couple of days.",
    });
  } else {
    res
      .status(401)
      .json({ message: "You have already requested access please wait." });
  }
};

exports.investor_signup = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, "secret");

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    type: "Investor",
    profile_pic:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const newInvestor = await Investor.create({ user_id: user.id });

  return res.status(200).json({
    message: "user logged in",
    token: token,
    user: { ...user.dataValues, ...newInvestor.dataValues },
  });
};

exports.business_signup = async (req, res) => {
  const token = await jwt.sign({ email: req.body.email }, "secret");

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    type: "Business",
    profile_pic:
      "https://thumbs.dreamstime.com/b/dollars-suitcase-business-icon-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-134169376.jpg",
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const newBusiness = await Business.create({ user_id: user.id });

  return res.status(200).json({
    message: "User logged in",
    token: token,
    user: { ...user.dataValues, ...newBusiness.dataValues },
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    raw: true,
  })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(500).json({ message: "User not found" });
      } else {
        // password hash
        bcrypt.compare(
          req.body.password,
          dbUser.password,
          async (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .json({ message: "Error while checking user password" });
            } else if (compareRes) {
              // password match
              const token = jwt.sign(dbUser, "secret", { expiresIn: "1h" });
              const type = dbUser.type;
              if (type == "Investor") {
                const investor = await User.findOne({
                  where: {
                    id: dbUser.id,
                  },
                  include: [
                    {
                      model: db.Investor,
                      include: [
                        {
                          model: db.Market,
                        },
                        {
                          model: db.PreviousInvestment,
                        },
                        {
                          model: db.Industry,
                        },
                        {
                          model: db.InvestmentInterest,
                        },
                        {
                          model: db.Competence,
                        },
                      ],
                    },
                  ],
                });

                // Create a new object with the necessary properties from the investor object
                const investorData = {
                  id: investor.user_id,
                  investor_experience: investor.Investor.investor_experience,
                  investor_type: investor.Investor.investor_type,
                  available_capital: investor.Investor.available_capital,
                  public: investor.Investor.public,
                  markets: investor.Investor.Markets.map((market) => ({
                    id: market.id,
                    name: market.name,
                    icon: market.icon,
                  })),
                  industries: investor.Investor.Industries.map((industry) => ({
                    id: industry.id,
                    name: industry.name,
                  })),
                  investmentInterests:
                    investor.Investor.InvestmentInterests.map((interest) => ({
                      id: interest.id,
                      name: interest.name,
                    })),
                  previousInvestments:
                    investor.Investor.PreviousInvestments.map((investment) => ({
                      id: investment.id,
                      name: investment.name,
                      icon: investment.icon,
                    })),
                  competences: investor.Investor.Competences.map(
                    (competence) => ({
                      id: competence.id,
                      name: competence.name,
                    })
                  ),
                };

                return res.status(200).json({
                  message: "user logged in",
                  token: token,
                  user: {
                    ...investorData,
                    ...dbUser,
                    user_id: dbUser.id,
                  },
                  type: type,
                });
              } else {
                const user = await User.findOne({
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

                const formattedUser = {
                  ...user.dataValues,
                  ...business,
                  id: business.user_id,
                  user_id: user.id,
                };

                return res.status(200).json({
                  message: "user logged in",
                  token: token,
                  user: formattedUser,
                  type: type,
                });
              }
            } else {
              // password doesnt match
              res.status(401).json({ message: "Invalid credentials" });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "Invalid credentials" });
    });
};

exports.hasFileAccess = async (req, res, next) => {
  const invitation = await FileRequest.findOne({
    where: {
      user_id: req.body.id,
      request_user_id: req.body.user_id,
    },
    raw: true,
  });

  if (!invitation) {
    res.status(200).send({ access: -1 });
  } else if (invitation.access == 1) {
    res.status(200).send({ access: invitation.access });
  } else {
    res.status(200).send({ access: 0 });
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const invitation = await Invitation.findOne({
      where: {
        token: req.params.confirmationCode,
      },
    });

    if (!invitation) {
      return res.status(404).send({ message: "User Not found." });
    }

    invitation.access = 1;
    await invitation.save();

    nodemailer.sendRegistrationEmail(invitation.email);

    res
      .status(200)
      .send("Brugeren har nu fået en mail, med link til registration");
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).send({ message: error.message });
  }
};

exports.verifyFileAccess = async (req, res, next) => {
  try {
    const invitation = await FileRequest.findOne({
      where: {
        token: req.params.confirmationCode,
      },
    });

    if (!invitation) {
      return res.status(404).send({ message: "User Not found." });
    }

    invitation.access = 1;
    await invitation.save();

    const receiver = await User.findOne({
      where: {
        id: invitation.user_id,
      },
      raw: true,
    });

    const sender = await User.findOne({
      where: {
        id: invitation.request_user_id,
      },
      raw: true,
    });

    nodemailer.sendAccessConfirmedMail(
      receiver.email,
      receiver.name,
      sender.name,
      sender.id
    );

    res.status(200).send("You can now close this window.");
  } catch (error) {
    console.error("Error verifying file access:", error);
    res.status(500).send({ message: error.message });
  }
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Investor = require('../models/').Investor;
const Business = require('../models/').Business;
const User = require('../models').User;
const Pitch = require('../models').Pitch;
const user_type = require('../models/').UserTypes
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database');


const INVESTOR_SIGNUP = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    },raw:true})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, async(err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(async(user) => {
                    Investor.create(({
                        user_id: user.id,
                        investor_experience: req.body.investor_experience,
                        investor_type: req.body.investor_type,
                        available_capital: req.body.available_capital,
                        description: req.body.description,
                        profile_pic: req.body.profile_pic,
                        public: req.body.public,
                        }))
                    .then(async(investor) => {
                        user_type.create(({
                        id: investor.user_id,
                        type: "Investor"
                    }))

                    /*
                        const expertises = req.body.expertises
    await investor.setExpertises(expertises)
const competences = await sequelize.query('SELECT m.* FROM expertises m INNER JOIN investor_expertise am on m.id = am.expertiseId INNER JOIN investors a on am.investorId = a.id WHERE a.id = ?',{replacements: [investor.id],type: QueryTypes.SELECT});
                     
                     
                     */
                      const token = await jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                      res.status(200).json({message: "user created", token: token, user: {...investor.dataValues,...user.dataValues}});
                      })
                    })
                   
                    
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const BUSINESS_SIGNUP = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    },raw:true})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then((user) => {
                    Business.create(({
                            user_id: user.id,
                            business_name: req.body.business_name,
                            business_cvr: req.body.business_cvr,
                            logo: req.body.logo,
                            industry: req.body.industry,
                            development_stage: req.body.development_stage,
                            description: req.body.description,
                            profile_visits: 0,
                        }))
                    .then((business) => {
                        user_type.create(({
                        id: business.user_id,
                        type: "Business"
                    }))
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user created", token: token, user: business});

                })})
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};


const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.body.email, 
    },raw:true})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "User not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.body.password, dbUser.password, async(err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "Error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign(dbUser, 'secret', { expiresIn: '1h' });
                    const type = await sequelize.query('SELECT type FROM UserTypes WHERE id = ?',{replacements: [dbUser.id],type: QueryTypes.SELECT});

                   if(type[0].type == 'Investor'){
                     const investor = await Investor.findOne({
                        where: {
                            user_id: dbUser.id
                        },
                        raw:true
                    })  

                
                    res.status(200).json({message: "user logged in", "token": token, "user": {...investor, ...dbUser}, "type": type});
                   }else{
                    const bussiness = await Business.findOne({
                        where: {
                            user_id: dbUser.id
                        },
                        raw:true,
                    })  

                    res.status(200).json({message: "user logged in", "token": token, "user": {...bussiness, ...dbUser, id: bussiness.id}, "type": type});
                   }
                } else { // password doesnt match
                    res.status(401).json({message: "Invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

module.exports = {login, isAuth, BUSINESS_SIGNUP, INVESTOR_SIGNUP};
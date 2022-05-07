const models = require('../models');
const Business = models.Business;
const Pitch = models.Pitch;
const User = models.User;
const Market = models.Market;
const Industry = models.Industry;
const Section = models.Section;
const Deck = models.Deck;
const Video = models.Video;
const Employee = models.Employee;
const savedPitches = models.savedPitch;
const sequelize = require('../utils/database');
const {Op} = require('sequelize');
const {QueryTypes} = require('sequelize');

const createPitch = async(req,res) => {
const { id } = req.params;
const {data} = req.body;


    try {  
    const deleteData = async() => {
     await Section.findAll({
        where: {userId: id}
     }).then((result) => {
         return Section.destroy({where: {userId: id}})
         .then((u) => {
           const sectionID = result.map(item => item.dataValues.id);
           Deck.findAll({where: {
           sectionId: sectionID
           }}).then((deck) => {
           Deck.destroy({where: {sectionId: sectionID}})
           const deckID = deck.map(item => item.dataValues.id);
           Video.destroy({where: {deckId: deckID}})
           })
           .then(() => {
             console.log("nu kører den")
             insertData();
           })
          });
     }); 
    }

    const insertData = async() => {
     data.map((section,index) => {
     Section.create({id: section.id, title: section.title, index:index, userId:id})
     section.subItems.map((deck,index) => {
     Deck.create({id: deck.id, title: deck.title, index: index, sectionId: section.id});
     if(deck.content){
      Video.create({duration: deck.content.duration, video:deck.content.video, type:deck.content.type, deckId: deck.id})
     }
     })
     })
    }

   await deleteData();     
       res.status(200).json("Video pitch has been created!")  
       } catch (err) {
         console.log(err);
         res.status(500).json(err);
       }
}

const publishPitch = async(req,res) => {
  const { id } = req.params;
  
  try {

    await Section.update(
      {
        public: true,
      },
      {
        where: { userId: id },
      }
    );

    res.status(200).json("Nu er den public")
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

}

const getPitch = async(req,res) => {
  const { id } = req.params;

  try {
   
    const data = await Section.findAll({
      where: {
        userId: id,
        public:true,
      },
      include: [{
        model: Deck,
        as:'subItems',
        separate: true,
        order: [['index', 'asc']],
        include: [{
          model: Video,
          as: "content",
          order: sequelize.col('index'),
          required: false,
        }],
    },
  ]
    });
   
    res.status(200).json(data)  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const getDevelopmentPitch = async(req,res) => {
  const { id } = req.params;

  try {
   
    const data = await Section.findAll({
      where: {
        userId: id,
      },
      include: [{
        model: Deck,
        as:'subItems',
        separate: true,
        order: [['index', 'asc']],
        include: [{
          model: Video,
          as: "content",
          order: sequelize.col('index'),
          required: false,
        }],
    },
  ]
    });
   
    res.status(200).json(data)  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}



const fetchPitches = async(req,res) => {
  const { id } = req.params

  try {
const wantedLocations = await Market.findAll({where: {
  user_id: id
},raw:true})
var locations = wantedLocations.map(function(a) {return {"location":a.name};});

const wantedIndustrys = await Industry.findAll({where: {
  user_id: id
},raw:true})

var industrys = wantedIndustrys.map(function(a) {return {"industry":a.name};});

if(locations.length > 0 && industrys.length > 0){
  const business = await Business.findAll({where: {
    [Op.or]: industrys,
    [Op.or]: locations
  },raw:true})

  console.log("business der matcher krav", business)

  
var businessIDS = business.map(function(a) {return {"BusinessId":a.user_id};});


  const pitches = await Pitch.findAll({where: {
    [Op.or]:businessIDS,
  },raw:true});
  res.status(200).json(pitches)
}
else{
  const allPitches = await Pitch.findAll({raw:true});
  res.status(200).json(allPitches)
}

  } catch (error) {
    console.log(error);
res.status(500).json("Hov noget gik galt.")    
  }

}


const hasPitch = async(req,res) => {
  const { id } = req.params

  try {

   const pitch = await Pitch.findOne({where: {
     BusinessId: id
   }}) 

   if(pitch){
    res.status(200).json(true);
   }
   else{
    res.status(200).json(false);
   }
   
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}


const fetchPitch = async(req,res) => {
  const { id } = req.params

  try {
  const pitch = await Pitch.findOne({
    raw:true,
    where: {
      user_id: id
    } 
  });
  res.status(200).json(pitch) 
  } catch (error) {
    res.status(500).json("Hov noget gik galt.")    

  }

  }

  
const getSavedPitches = async(req,res) => {
  const { id } = req.params

  try { 
    
  const [results, metadata] = await sequelize.query(`
  select m.* from pitchrdb.Pitches m inner join pitchrdb.savedPitches am on m.id = am.pitchID inner join pitchrdb.Investors a on am.investorID = a.user_id where a.user_id = ?
`,{replacements: [id], type: QueryTypes.SELECT})

  res.status(200).json([results]) 
  } catch (error) {
    console.log(error);
    res.status(500).json("Hov noget gik galt.")    

  }

  }

  const savePitch = async(req,res) => {
    const { pitchID,investorID } = req.params
  
    try {
     const savedPitch = await savedPitches.create({
      investorID: investorID,
      pitchID:pitchID,
    })
    res.status(200).json(savedPitch) 
    } catch (error) {
      console.log(error);
      res.status(500).json("Hov noget gik galt.")    
  
    }
  
    }

module.exports = {hasPitch,getPitch,publishPitch,getDevelopmentPitch,getSavedPitches,savePitch,createPitch,fetchPitches,fetchPitch}
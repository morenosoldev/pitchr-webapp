const models = require('../models');
const PitchDeck = models.PitchDeck;
const User = models.User;
const Business = models.Business;
const convertapi = require('convertapi')('TPhdYfkwPg6vaOT1');
const Metrics = models.Metric;
const Row = models.Row;

const createPitchDeck = (req,res) => {
    const { id } = req.params;
    const {file} = req.body;
    console.log(req.body);
    console.log(file);

    try {
    PitchDeck.create({
    "file": file,
    "userId": id
    })

    res.status(200).json("Oprettet");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const getPitchDeck = async(req,res) => {
  const { id } = req.params;

  try {
  const deck = await PitchDeck.findOne({where: {
    userId: id
  }})

  console.log(deck);

if(deck){
convertapi.convert('extract-images', {
    File: deck.file
}, 'pdf').then(function(result) {
  console.log(result.response.Files)
  res.status(200).json({deck,"files": result.response.Files});
});  
}
else{
  res.status(200).json(deck);
}


  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
}

const getPitchDecks = async(req,res) => {
try {
    const data = await User.findAll({
      where: {
      type: 'Business'
      },
        include: [
          {
            model: Business,
            required: true,
            include: ["employees", 
            {model:
            PitchDeck
            },
            {
              model:Metrics,
              include: [{
                model: Row,
                as: 'rows'
              }]
            }
          ]
          }
        ]
      });
    
    res.status(200).json(data);
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
      
}


module.exports = {createPitchDeck,getPitchDecks,getPitchDeck}

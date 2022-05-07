const models = require('../models');
const pitch = models.Pitch;
const file = models.File;
const business = models.Business;

const getVideoPitchFiles = async(req,res) => {
const { id } = req.params

try{
const pitchFiles = await pitch.findAll({
    where: {
      user_id: id   
    }
})
res.status(200).json(pitchFiles);
} 
catch (err) {
  res.status(500).json(err);
}
}

const deleteVideoPitchFile = async(req,res) => {
const { id } = req.params
try{
  await pitch.destroy({
      where:{
          id: id 
      }
  })
  res.status(200).json("File has been deleted");
} catch (err) {
  res.status(500).json(err);
}
}

const getFiles = async(req,res) => {
    const { id } = req.params
    
    try{
    const files = await file.findAll({
        where: {
          user_id: id,  
        }
    })
    console.log(files);
    res.status(200).json(files);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    }
    
    const createFile = async(req,res) => {
        const { id } = req.params
        const {fileName,fileType,type,fileSize,fileUrl} = req.body.body;

        try{
          await business.findOne({
              where: {
              user_id: id,
              }
          }).then(user => {
            file.create({
              fileName: fileName,
              fileType:fileType,
              type: type,
              fileSize: fileSize,
              fileUrl: fileUrl,
              user_id: id
            }).then((file) => {
               res.status(200).json(file);    
              })

          })
         
        } catch (err) {
          res.status(500).json(err);
        }
        }
    

    const deleteFile = async(req,res) => {
    const { id } = req.params
    try{

      await file.destroy({
          where:{
              id: id
          }
      })
      
      res.status(200).json("File has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
    }



module.exports = {getVideoPitchFiles,deleteVideoPitchFile,createFile,getFiles,deleteFile}
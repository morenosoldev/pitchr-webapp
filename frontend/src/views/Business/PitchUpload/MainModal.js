import React, { useState } from "react";
import { useSelector } from 'react-redux'
import ModalOne from './ModalOne'
import ModalTwo from './ModalTwo'
import ModalThree from './ModalThree'
import ModalFour from './ModalFour'
import { ProgressBar } from "react-bootstrap";

function MainModal() {
const user = useSelector(state => state.authentication.user);    

const [video,setVideo] = useState({
step:1,
videoFile: '',
videoUrl: '',
loomHTML: '',
loom: '',
pitchDeck: '',
progress: 0,
name: user.name,
calendly: user.calendly,
title: '',
description: '',
logo: user.profile_pic,
thumbnail: '',
userId: user.user_id,
})

 // Proceed to next step
 const nextStep = () => {
    const { step } = video;
    
    setVideo(prevState => ({
        ...prevState,
        step: step + 1
    }));
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } = video;
    setVideo(prevState => ({
        ...prevState,
        step: step - 1
    }));
  };

  const publishVideo = async(url) => {
    setVideo(prevState => ({
      ...prevState,
      videoUrl: url
  }));
  }

  const publishPitchDeck = async(url) => {
    setVideo(prevState => ({
      ...prevState,
      pitchDeck: url
  }));
  }

  const publishLoomVideo = async(url) => {
    setVideo(prevState => ({
      ...prevState,
      loom: url
  }));
  }

  const changeLoomHTML = (url) => {
    setVideo(prevState => ({
      ...prevState,
      loomHTML: url
  }));
  }

  const changeThumbnail = (url) => {
    setVideo(prevState => ({
      ...prevState,
      thumbnail: url
  }));
  }

  const changeTitle = (title) => {
    setVideo(prevState => ({
      ...prevState,
      title: title
  }));
  }

  const changeDescription = (description) => {
    setVideo(prevState => ({
      ...prevState,
      description: description
  }));
  }


  const setProgress = (progress) => {
    //if(progress > 99) nextStep();
    setVideo(prevState => ({
      ...prevState,
      progress: progress
  }));
  }

  const changeVideoFile = e => {
    setVideo(prevState => ({
      ...prevState,
      videoFile: e.target.files[0]
    }))
    }
    

const {step} = video; 
    switch (step) {     
        case 1:
          return (
            <>
           <ProgressBar style={{borderRadius:'0'}} now={20} />
            <ModalOne
              nextStep={nextStep}
              progress={video.progress}
              publishPitchDeck={publishPitchDeck}
              setProgress={setProgress}
              video={video}
            />
            </>
          );
        case 2:
          return (
            <>
            <ProgressBar style={{borderRadius:'0'}} now={40} />
            <ModalTwo
              nextStep={nextStep}
              prevStep={prevStep}
              changeVideoFile={changeVideoFile}
              changeLoomHTML={changeLoomHTML}
              progress={video.progress}
              publishLoomVideo={publishLoomVideo}
              setProgress={setProgress}
              publishVideo={publishVideo}
              video={video}
            />
             </>
          )
        case 3: 
         return (
           <>
  <ProgressBar style={{borderRadius:'0'}} now={60} />
             <ModalThree prevStep={prevStep} loom={video.loom} loomHTML={video.loomHTML} nextStep={nextStep} changeThumbnail={changeThumbnail} nextStep={nextStep} publishVideo={publishVideo} changeTitle={changeTitle} changeDescription={changeDescription} title={video.title} description={video.description} video={video}/>
           </>
         )

         case 4: 
         return (
           <> 
  <ProgressBar style={{borderRadius:'0'}} now={100} />
 <ModalFour video={video}/>
           </>
         )
        default:
          (
    }
    
    }

export default MainModal;
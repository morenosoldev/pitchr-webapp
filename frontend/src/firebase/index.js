import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import moment from "moment";
import { firebaseConfig } from "../config/firebase.config";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const formatVideoDuration = (duration) => {
  return moment.duration(duration, "seconds").format();
};

const uploadVideo = async (video, setProgress) => {
  try {
    const videoRef = await storage.ref(`videos/${video.name}`);
    videoRef.put(video).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => setProgress({ error: error.message })
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const url = await videoRef.getDownloadURL();

    // Get video duration using HTML5 video element
    const videoElement = document.createElement("video");
    videoElement.src = url;

    const durationPromise = new Promise((resolve, reject) => {
      videoElement.onloadedmetadata = () => {
        const duration = formatVideoDuration(videoElement.duration);
        resolve(duration);
      };

      videoElement.onerror = (error) => {
        reject(error);
      };
    });

    const duration = await durationPromise;

    return {
      duration,
      url,
    };
  } catch (error) {
    throw error;
  }
};
const uploadFile = async (file) => {
  try {
    const fileRef = storage.ref(`files/${file.name}`);
    await fileRef.put(file);

    const downloadURL = await fileRef.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const uploadImage = async (image) => {
  try {
    const imageRef = storage.ref(`images/${image.name}`);
    await imageRef.put(image);

    const downloadURL = await storage
      .ref(`images/${image.name}`)
      .getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

export { uploadImage, uploadVideo, uploadFile, storage };

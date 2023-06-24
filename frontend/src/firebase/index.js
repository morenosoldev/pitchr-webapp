import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import moment from "moment";
import { firebaseConfig } from "../config/firebase.config";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const formatVideoDuration = (duration) => {
  return moment.duration(duration, "seconds").format();
};

const uploadVideo = (video, setProgress) => {
  return new Promise((resolve, reject) => {
    try {
      const videoRef = storage.ref(`videos/${video.name}`);
      const uploadTask = videoRef.put(video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const videoElement = document.createElement("video");
            videoElement.src = downloadURL;

            videoElement.onloadedmetadata = () => {
              const duration = formatVideoDuration(videoElement.duration);
              resolve({
                duration,
                url: downloadURL,
              });
            };

            videoElement.onerror = (error) => {
              reject(error);
            };
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
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

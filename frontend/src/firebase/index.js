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
    await videoRef.put(video).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => setProgress({ error: error.message })
    );

    // Introduce a delay to ensure the file is available for download
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
  const FileRef = await storage.ref(`files/${file.name}`);

  const image = await FileRef.put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
    })

    .then((downloadURL) => {
      console.log(
        `Successfully uploaded file and got download link - ${downloadURL}`
      );
      return downloadURL;
    })

    .catch((error) => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
    });

  return image;
};

const uploadImage = async (image) => {
  const imageRef = await storage.ref(`images/${image.name}`);
  await imageRef.put(image).on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);
    },
    (error) => {
      // file upload failed
      console.log(error);
    },
    () => {
      // file upload completed
      storage
        .ref(`images/${image.name}`)
        .getDownloadURL()
        .then(
          (url) => {
            // got download URL
          },
          (error) => {
            // failed to get download URL
            console.log(error);
          }
        );
    }
  );
};

export { uploadImage, uploadVideo, uploadFile, storage };

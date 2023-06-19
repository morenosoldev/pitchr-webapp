const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const axios = require("axios");

// Replace the following with your Firebase service account key JSON
const serviceAccount = require("./pitchr.json");

// Replace with your Firebase Storage bucket name
const bucketName = "pitchr-d3d71.appspot.com";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName,
});

// Get a reference to the default Firebase Storage bucket
const bucket = admin.storage().bucket();
// Function to upload an image from an external source to Firebase Storage and return the download URL
const uploadImage = async (imageURL, destinationPath) => {
  try {
    // Fetch the image data from the external source
    const { data } = await axios.get(imageURL, {
      responseType: "arraybuffer",
    });

    const destinationFile = bucket.file(destinationPath);

    // Upload the image data to Firebase Storage
    await destinationFile.save(data, {
      metadata: {
        contentType: "image/webp", // Adjust the content type according to the image format
      },
    });

    // Generate and return the download URL for the uploaded image
    const [url] = await destinationFile.getSignedUrl({
      action: "read",
      expires: "03-01-2500", // Adjust the expiration date as desired
    });

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Export the uploadImage function for external use
module.exports = uploadImage;

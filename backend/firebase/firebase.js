const axios = require("axios");
const bucketName = "pitchrimages";
const AWS = require("aws-sdk");

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1", // Replace with your desired AWS region
});

const s3 = new AWS.S3();

const uploadImage = async (imageURL, destinationPath) => {
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    const params = {
      Bucket: bucketName,
      Key: destinationPath,
      Body: imageBuffer,
      ContentType: "image/webp",
    };

    const uploadResult = await s3.upload(params).promise();

    // Generate and return the CDN URL for the uploaded image
    const cdnUrl = uploadResult.Location;
    return cdnUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Export the uploadImage function for external use
module.exports = uploadImage;

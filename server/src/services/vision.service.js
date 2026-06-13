const axios = require("axios");

exports.analyzeImage = async (imageUrl) => {
  const visionUrl = `${process.env.VISION_SERVICE_URL || "http://127.0.0.1:8000"}/analyze`;
  const response = await axios.post(visionUrl, {
    imageUrl
  });

  return response.data; 
};

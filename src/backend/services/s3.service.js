const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");
require("dotenv").config();

const generatePreSignedUrl = async (filename, fileType) => {
  const key = `observations/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return { presignedUrl, fileUrl };
};

module.exports = { generatePreSignedUrl };

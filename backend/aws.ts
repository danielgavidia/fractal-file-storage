import dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();

// AWS
export const awsBucket = process.env.AWS_BUCKET;
export const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: awsAccessKeyId ? awsAccessKeyId : "",
    secretAccessKey: awsSecretAccessKey ? awsSecretAccessKey : "",
  },
});

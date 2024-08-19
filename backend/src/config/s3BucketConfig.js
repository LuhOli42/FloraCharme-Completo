import aws from "aws-sdk";

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_S3,
    secretAccessKey: process.env.SECRET_KEY_S3,
  },
});

export default s3;

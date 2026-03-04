const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  appBaseUrl: process.env.APP_BASE_URL,
  smsProviderUrl: process.env.SMS_PROVIDER_URL,
  emailProviderUrl: process.env.EMAIL_PROVIDER_URL,
  s3Bucket: process.env.S3_BUCKET,
  awsRegion: process.env.AWS_REGION
};

const AWS = require("aws-sdk");

const awsRegion = process.env.AWS_REGION || 'ap-northeast-1';
const setupAws = () => {
  if (process.env.NODE_ENV !== 'production') {
    AWS.config.update({
      accessKeyId: 'AKID',
      secretAccessKey: 'SECRET',
      region: awsRegion,
      endpoint: "http://localhost:8000"
    });
  } else {
    AWS.config.update({
      region: awsRegion
    });
  }
};

exports.configAws = function() {
  setupAws();
  return AWS;
};
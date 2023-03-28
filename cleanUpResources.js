const AWS = require('aws-sdk');

// Set the AWS Region (if not already set in your environment)
AWS.config.update({ region: 'eu-north-1' });

const cloudformation = new AWS.CloudFormation();

const deleteStack = async (stackName) => {
  try {
    // Initiate the stack deletion
    await cloudformation.deleteStack({ StackName: stackName }).promise();
    console.log(`Stack deletion initiated for ${stackName}.`);

    // Wait for the stack deletion to complete
    await cloudformation.waitFor('stackDeleteComplete', { StackName: stackName }).promise();
    console.log(`Stack ${stackName} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting stack ${stackName}:`, error.message);
  }
};

const stackName = 'cloudformation-iam-user';
deleteStack(stackName);
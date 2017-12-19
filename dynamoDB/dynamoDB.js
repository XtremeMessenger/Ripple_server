const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB();

dynamodb.createTable({
  TableName: "DirectMessages",
  KeySchema: [
    { AttributeName: "directRoomId", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "directRoomId", AttributeType: "N" } //S - String, N - Number
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

dynamodb.createTable({
  TableName: "GroupMessages",
  KeySchema: [
    { AttributeName: "roomID", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "roomID", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

var Movies = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" },  //Partition key
    { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};
dynamodb.createTable(Movies, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
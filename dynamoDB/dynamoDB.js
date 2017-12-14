const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB();

dynamodb.createTable({
  TableName: "DirectMessages",
  KeySchema: [
    { AttributeName: "directRoomId", KeyType: "HASH" } //Partition key
    // { AttributeName: "timestamp", KeyType: "RANGE" } //Sort key
    // { AttributeName: "from", KeyType: "RANGE" }  
  ],
  AttributeDefinitions: [
    { AttributeName: "directRoomId", AttributeType: "N" }
    // { AttributeName: "timestamp", AttributeType: "N" } //S - String, N - Number
    // { AttributeName: "to", AttributeType: "S" } 
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
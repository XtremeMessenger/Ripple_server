const dynamoDB = require('./dynamoDB');

const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB();

module.exports = {
  privateChatStore: {
    post: function (data, callback) {
      docClient.put({
        TableName: Messages,
        Item: {
          "from": data.from,
          "to": data.to,
          "text": data.text
        }
      }, function (err, data) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          callback(undefined, 'success')
          console.log("Added item:", JSON.stringify(data, null, 2));
        }
      });
    }
  },
}
// const dynamoDB = require('./dynamoDB');

const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {

  privateChatStore: {
    post: function (data, callback) {
      dynamodb.put({
        TableName: "Messages",
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

  getPrivateChatHistory: {
    post: function (data, callback) {
      db.Messages.findAll({
        where: {
          [Sequelize.Op.or]: [{
            from: data.from,
            to: data.to
          },
          {
            from: data.to,
            to: data.from
          }]
        },
        limit: 1000
      }).then(messages => {
        callback(undefined, messages);
      }).catch(function (err) {
        console.log('DB getPrivateChatHistory error ====== ', err);
        callback(err);
      })
    }
  }, 

}
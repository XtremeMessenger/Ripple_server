const dynamoDB = require('./dynamoDB');

const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {

  privateChatStore: {
    post: function (data, callback) {
      dynamodb.query({
        TableName: "DirectMessages",
        KeyConditionExpression: "#directRoomId = :directRoomId",
        ExpressionAttributeNames: {
          "#directRoomId": "directRoomId"
        },
        ExpressionAttributeValues: {
          ":directRoomId": data.directRoomId
        }
      }, function (err, data2) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log('data2.Items[0]', data2.Items[0])

          // if (data2.Items[0].info) {
          //   let messageAry = data2.Items[0].info;
          // } else {
          //   let messageAry = []
          // }
          let messageAry = data2.Items[0].info;
          console.log('messageAry', messageAry)
          let newMessage = {
            "directRoomId": data.directRoomId,
            "from": data.from,
            "text": data.text
          }
          messageAry.push(newMessage)
          

          dynamodb.put({
            TableName: "DirectMessages",
            Item: {
              "directRoomId": data.directRoomId,
              "info": messageAry
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

          // callback(undefined, data2)
          console.log("messageAry:", JSON.stringify(messageAry, null, 2));
        }
      });
    }
  },

  // privateChatStore: {
  //   post: function (data, callback) {
  //     dynamodb.put({
  //       TableName: "DirectMessages",
  //       Item: {
  //         "directRoomId": data.directRoomId,
  //         "info": [{
  //           "directRoomId": data.directRoomId,
  //           "from": data.from,
  //           "text": data.text}]
  //       }
  //     }, function (err, data) {
  //       if (err) {
  //         callback(err)
  //         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  //       } else {
  //         callback(undefined, 'success')
  //         console.log("Added item:", JSON.stringify(data, null, 2));
  //       }
  //     });
  //   }
  // },

  getPrivateChatHistory: {
    post: function (data, callback) {

      dynamodb.query({
        TableName: "DirectMessages",
        KeyConditionExpression: "#directRoomId = :directRoomId",
        ExpressionAttributeNames: {
          "#directRoomId": "directRoomId"
        },
        ExpressionAttributeValues: {
          ":directRoomId": data.directRoomId
        }
      }, function (err, data2) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          // if (data2.Items[0].info !== undefined) {
          //   let messageAry = data2.Items[0].info;
          // } else {
          //   let messageAry = []
          // }
          let messageAry = data2.Items[0].info;
          callback(undefined, messageAry)
          console.log('messageAry ======== ', messageAry)
          console.log("messageAry:", JSON.stringify(messageAry, null, 2));
        }
      });

    }
  }, 

  // getPrivateChatHistory: {
  //   post: function (data, callback) {
  //     db.Messages.findAll({
  //       where: {
  //         [Sequelize.Op.or]: [{
  //           from: data.from,
  //           to: data.to
  //         },
  //         {
  //           from: data.to,
  //           to: data.from
  //         }]
  //       },
  //       limit: 1000
  //     }).then(messages => {
  //       callback(undefined, messages);
  //     }).catch(function (err) {
  //       console.log('DB getPrivateChatHistory error ====== ', err);
  //       callback(err);
  //     })
  //   }
  // }, 

}
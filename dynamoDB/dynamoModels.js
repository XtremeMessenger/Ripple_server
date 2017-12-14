const dynamoDB = require('./dynamoDB');

const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports = {
/*
  privateChatStore: {
    post: function (data, callback) {
      let date = Date.now();
      var newObj = {};

      newObj[date] = {
        "timestamp": date,
        "from": data.from,
        "text": data.text
      }

      console.log('this is newObj === ', newObj)

      dynamodb.put({
        TableName: "DirectMessages",
        Item: {
          "directRoomId": data.directRoomId,
          messageObj: newObj
        }
      }, function (err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
        }
      });
    }
  },
*/
///*
  privateChatStore: {
    post: function (dataFromClient, callback) {
      dynamodb.query({
        TableName: "DirectMessages",
        KeyConditionExpression: "#directRoomId = :directRoomId",
        ExpressionAttributeNames: {
          "#directRoomId": "directRoomId"
        },
        ExpressionAttributeValues: {
          ":directRoomId": dataFromClient.directRoomId
        }
      }, function (err, dataFromDB) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          let date = Date.now();
          var newObj = {};

          newObj[date] = {
            "timestamp": date,
            "from": dataFromClient.from,
            "text": dataFromClient.text
          }

          console.log('this is newObj === ', newObj)
          console.log('dataFromDB.Items[0]', dataFromDB.Items[0])
          
          Object.assign(dataFromDB.Items[0].messageObj, newObj)
          console.log('dataFromDB.Items[0] after', dataFromDB.Items[0])

          // callback(undefined, 'got it')
          dynamodb.put({
            TableName: "DirectMessages",
            Item: dataFromDB.Items[0]
          }, function (err, dataAfterPut) {
            if (err) {
              callback(err)
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
              callback(undefined, 'success')
              console.log("Added item:", JSON.stringify(dataAfterPut, null, 2));
            }
          });

          // callback(undefined, dataFromDB)
          // console.log("messageAry:", JSON.stringify(messageAry, null, 2));
        }
      });
    }
  },
//*/
  // privateChatStore: {
  //   post: function (data, callback) {
  //     dynamodb.put({
  //       TableName: "DirectMessages",
  //       Item: {
  //         "directRoomId": data.directRoomId,
  //         "info": {
  //           "directRoomId": data.directRoomId,
  //           "from": data.from,
  //           "text": data.text}
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
      }, function (err, dataFromDB) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          // if (dataFromDB.Items[0].info !== undefined) {
          //   let messageAry = dataFromDB.Items[0].info;
          // } else {
          //   let messageAry = []
          // }
          let messageObj = dataFromDB.Items[0];
          callback(undefined, messageObj)
          console.log('messageObj ======== ', messageObj)
          // console.log("messageObj:", JSON.stringify(messageObj, null, 2));
        }
      });

    }
  }, 

  createDirectChat: {
    post: function (dataFromClient, callback) {

      var newObj = {};
      newObj[dataFromClient.timestamp] = {
        "timestamp": dataFromClient.timestamp,
        "from": dataFromClient.from,
        "text": dataFromClient.text
      }

      let params = {
        TableName: "DirectMessages",
        Item: {
          "directRoomId": dataFromClient.directRoomId,
          messageObj: newObj
        }
      };
      dynamodb.put(params, function (err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          callback(err)
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          callback(undefined, 'first message started')
        }
      });
    }
  }, 

}
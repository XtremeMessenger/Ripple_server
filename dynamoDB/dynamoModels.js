const dynamoDB = require('./dynamoDB');

const AWS = require("aws-sdk");
AWS.config.loadFromPath('./config/AWSKey.json');

var dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports = {

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
        }
      });
    }
  },

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
          let messageObj = dataFromDB.Items[0];
          callback(undefined, messageObj)
          console.log('messageObj ======== ', messageObj)
        }
      });
    }
  }, 

  getGroupChatHistory: {
    post: function (data, callback) {
      console.log('inside getGroupChatHistory', data)
      dynamodb.query({
        TableName: "GroupMessages",
        KeyConditionExpression: "#roomID = :roomID",
        ExpressionAttributeNames: {
          "#roomID": "roomID"
        },
        ExpressionAttributeValues: {
          ":roomID": data.roomID
        }
      }, function (err, dataFromDB) {
        if (err) {
          callback(err)
          console.error("Unable to  getGroupChatHistory:. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          let messageObj = dataFromDB.Items[0];
          callback(undefined, messageObj)
          console.log('messageObj ======== ', messageObj)
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

  createGroupChat: {
    post: function (data, callback) {
      
      var newObj = {};
      let date = Date.now();
      console.log('inside createGroupChat', data.roomID, date)
      newObj[date] = {
        "timestamp": date,
        "from": data.owner,
        "text": 'Group chat created'
      }
      console.log('newObj', newObj)
      let params = {
        TableName: "GroupMessages",
        Item: {
          "roomID": data.roomID,
          messageObj: newObj
        }
      };
      dynamodb.put(params, function (err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          // callback(err)
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          // callback(undefined, 'first message started')
        }
      });
    }
  }, 

  createGroupChatArray: {
    post: function (data, callback) {

      let date = Date.now();
      console.log('inside createGroupChatArray', data.roomID, date)
      var newObj = {
        "timestamp": date,
        "from": data.owner,
        "text": 'Group chat created'
      }
      console.log('newObj', newObj)
      let params = {
        TableName: "GroupMessageArray",
        Item: {
          "roomID": data.roomID,
          messageArray: [newObj]
        }
      };
      dynamodb.put(params, function (err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          // callback(err)
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          // callback(undefined, 'first message started')
        }
      });
    }
  }, 

  groupChatArrayStore: {
    post: function (dataFromClient, callback) {
      console.log('in groupChatArrayStore data', dataFromClient)
      dynamodb.query({
        TableName: "GroupMessageArray",
        KeyConditionExpression: "#roomID = :roomID",
        ExpressionAttributeNames: {
          "#roomID": "roomID"
        },
        ExpressionAttributeValues: {
          ":roomID": dataFromClient.roomID
        }
      }, function (err, dataFromDB) {
        if (err) {
          callback(err)
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          let date = Date.now();
          var newObj = {
            "timestamp": date,
            "from": dataFromClient.from,
            "text": dataFromClient.text
          }

          console.log('this is newObj === ', newObj)
          console.log('dataFromDB.Items[0]', dataFromDB.Items[0])
          console.log('dataFromDB.Items[0].messageArray', dataFromDB.Items[0].messageArray)
          let arrayFromDB = dataFromDB.Items[0].messageArray;
          arrayFromDB.push(newObj)
          console.log('dataFromDB.Items[0] after', arrayFromDB)

          dynamodb.put({
            TableName: "GroupMessageArray",
            Item: {
              "roomID": dataFromClient.roomID,
              messageArray: arrayFromDB
            }
          }, function (err, dataAfterPut) {
            if (err) {
              callback(err)
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
              callback(undefined, 'success')
              console.log("Added item:", JSON.stringify(dataAfterPut, null, 2));
            }
          });
        }
      });
    }
  },

  getGroupChatArrayHistory: {
    post: function (data, callback) {
      console.log('inside getGroupChatHistory', data)
      dynamodb.query({
        TableName: "GroupMessageArray",
        KeyConditionExpression: "#roomID = :roomID",
        ExpressionAttributeNames: {
          "#roomID": "roomID"
        },
        ExpressionAttributeValues: {
          ":roomID": data.roomID
        }
      }, function (err, dataFromDB) {
        if (err) {
          callback(err)
          console.error("Unable to  getGroupChatHistory:. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          let messageArray = dataFromDB.Items[0];
          callback(undefined, messageArray)
          console.log('messageArray ======== ', messageArray)
        }
      });
    }
  }, 
}
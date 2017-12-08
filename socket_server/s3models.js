const s3models = require('./s3models.js')
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();
var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

module.exports = {
  dropFile: function (data, callback) {

    var params = { Bucket: bucketName, Key: data.name, Body: data };
    s3.putObject(params, function (err, data) {
      if (err)
        console.log(err)
      else
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });

        callback(undefined, 'success');
    }
}
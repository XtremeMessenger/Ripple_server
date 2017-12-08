const s3models = require('./s3models.js')
const fs = require('fs');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();
var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

module.exports = {
  dropFile: function (file, callback) {
    console.log('fileinfo', file)
    fs.readFile(`/download/${file.name}`, function(err, data) {
      if (err) throw err;
      var s3bucket = new AWS.S3({ params: { Bucket: bucketName } });
      s3bucket.createBucket(function () {
        var params = {
          Key: file.name, //file.name doesn't exist as a property
          Body: data
        };
      })
    })
  }
}

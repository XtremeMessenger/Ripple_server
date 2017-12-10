const s3models = require('./s3models.js')
const fs = require('fs');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();
var bucketName = 'jayop';
var keyName = 'hello_world.txt';

module.exports = {
  dropFile: function (file, callback) {
    console.log('fileinfo', file)
    fs.readFile(`./files/${file.name}`, function(err, data) {
      if (err) throw err;
      var s3bucket = new AWS.S3({ params: { Bucket: bucketName } });
      s3bucket.createBucket(function () {
        var params = {
          Key: file.name, //file.name doesn't exist as a property
          Body: data
        };
        s3bucket.upload(params, function (err, data) {
          // Whether there is an error or not, delete the temp file
          fs.unlink(`./files/${file.name}`, function (err) {
              if (err) {
                  console.error(err);
              }
              console.log('Temp File Delete');
          });

          console.log("PRINT FILE:", file);
         
      });

      })
    })
  }
}

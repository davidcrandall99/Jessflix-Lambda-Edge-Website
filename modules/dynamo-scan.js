const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
let dynamodb = new AWS.DynamoDB.DocumentClient()
const params = {
    TableName: "jessflix_videos",

}
const Events = require("events");
class Scanner extends Events { 
    scan() {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                this.emit("error", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Scan succeeded.");
                this.emit("scan", data.Items);
            }
        });
    }
}
module.exports = Scanner;
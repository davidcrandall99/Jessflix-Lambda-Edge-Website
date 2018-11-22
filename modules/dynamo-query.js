const AWS = require('aws-sdk'); AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient()
const Events = require("events");


class Query extends Events {
    query(uri) {
        //remove slashes for query
        uri = uri.replace(/\//g,"");
        //define params for query
        var params = {
            TableName: "jessflix_videos",
            FilterExpression: "#uri = :uri",
            ExpressionAttributeNames: {
                "#uri": "uri",
            },
            ExpressionAttributeValues: {
                ":uri": uri,
            }
        };
        dynamodb.scan(params, (err, data) => {
            if (err) {
                this.emit("error", JSON.stringify(err, null, 2));
                console.log(err);
            } else {
                // print all the movies
                console.log("Query succeeded.");
                
                if(data.Count > 0){
                    this.emit("scan", data.Items[0]);
                    console.log("page found")
                    
                } else {
                    this.emit("error", "page not found")
                }
            }
        });
    }
}

module.exports = Query;
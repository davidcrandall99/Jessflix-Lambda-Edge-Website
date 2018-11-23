const AWS = require('aws-sdk'); AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient()
const Events = require("events");


class Query extends Events {
    query(uri) {
        
        //remove slashes for query
        uri = uri.replace(/\//g,"");
        console.log("looking for ", uri);
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
                
                
                if(data.Count > 0){
                    console.log("page found")
                    this.emit("scan", data.Items[0]);
                    
                    
                } else {
                    console.log("error: page not found")
                    this.emit("error", "page not found")
                }
            }
        });
    }
}

module.exports = Query;
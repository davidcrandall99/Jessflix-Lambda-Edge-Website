const static = require('./modules/is-static');   //  let isStatic = static(uri);
const detectSlash = require('./modules/detect-slash'); //  let hasSlash = detectSlash(uri);
const scan = require('./modules/dynamo-scan');
const scanner = new scan;
const query = require('./modules/dynamo-query');
const getpage = new query;

exports.handler = (event, context, callback) => {
    const videoLoop = require('./modules/videoLoop');
    let record = event.Records[0].cf.request;
    let uri = record.uri;
    let isStatic = static(uri);
    let hasSlash = detectSlash(uri);

    if (hasSlash !== true) {
        var newUri = uri + '/';
        var response = {
                status: '301',
                headers: {
                    location: [{
                        key: "Location",
                        value: newUri
                    }]
                }
            }
        callback(null, response);
    } 
    else //static file actions
        if (isStatic === true) {
            console.log("requesting static asset, redirect to s3")
            const s3DomainName = 'www.jessflix.com.s3.amazonaws.com';
 
             /* Set S3 origin fields */
             record.origin = {
                 s3: {
                     domainName: s3DomainName,
                     region: 'us-east-1',
                     authMethod: 'none',
                     path: '',
                     customHeaders: {}
                 }
             };
             record.headers['host'] = [{ key: 'host', value: s3DomainName}];
             callback(null, record);
        } 
    else {
        //Homepage actions
        if (uri === "/") {
            var template = require('./templates/homepage');
            var cardloop = require('./components/cardloop');
            var sort = require('./modules/sort-vids');
            scanner.on("scan", (data) => {
                var sorted = sort(data);
                var content = cardloop(sorted);
                //var loop = videoLoop(data);
                var output = template(content);
                var response = {
                    status: '200',
                    body: output
                }
                callback(null, response);
                console.log("data returned");
                scanner.removeAllListeners();
            });
            scanner.on("error", (err) => {
                callback(err);
                console.log(err);
                scanner.removeAllListeners();
            });
            
            //scan
            scanner.scan();

        } else {

            getpage.on("scan", (data) => {
                var template = require('./templates/videopage');
                var output = template(data);
                var response = {
                    status: '200',
                    body: output
                }
                //callback(null, response);
                callback(null, response);
                getpage.removeAllListeners();
            });
            getpage.on("error", (error) => {
                var response = {
                    status: '404',
                    body: "<h1>Uh-oh! :,(</h1><p>This page doesn't exist</p>"
                }
                callback(null, response);
                getpage.removeAllListeners();
            })
            getpage.query(uri);   
        }
    }
};


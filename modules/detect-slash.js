const static = require('./is-static');

let detectSlash = (uri) => {
    var isStatic = static(uri);
    var l = uri.length - 1;
    var noslash;

    if (isStatic === false) {
        if (uri[l] !== "/") {
            noslash = true;
        } else {
            noslash = false;
        }
        if (noslash === true) {
            uri = uri + "/";
            return false;
        } else {
            return true;
            
        }
    } else {
        return true;
    }
}
var slash = detectSlash("/index.jpg");
console.log(slash);

module.exports = detectSlash;

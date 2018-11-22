//detect static files
let static = (uri) => {
    let x = [".jpg", ".png", ".js", ".css", ".svg", ".gif", ".xml", ".ico"];
    var f = 0;
    for (i in x) {
        var str = x[i];
        if (uri.indexOf(str) > -1) {
            f++;
        }
    }
    if (f > 0) { return true }
    else { return false }
}
module.exports = static;
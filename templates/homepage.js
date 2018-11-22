
var getHead = require('../components/head');
module.exports = (content) => {
 var head = getHead("Jessflix - Movie reviews, film analysis", "Hi! I'm Jessica. Join me as I talk about movies, film, television, and other fun stuff. :)");
 let page = `<html>
${head}
<body id="homepage">
<div id="banner">
<img src="/images/cat-logo.jpg" />
<h1>jessflix</h1>
<a class="btn" href="https://www.youtube.com/channel/UC2ruDanoGlRILpCEfJn_BUA?sub_confirmation=1">subscribe on
    youtube</a>

</div>
    <div class="container">
        <div class="col-12">
        <h2>Latest videos</h2>
        </div>
        ${content}
    </div>
</body>
</html>

`
return page;

};
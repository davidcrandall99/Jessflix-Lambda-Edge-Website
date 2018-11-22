var getHead = require('../components/head');
module.exports = (data) => {
    
    var description = data.description.replace(/\n/g, '</p><p>')

    var head = getHead(data.title + " | Jessflix", data.description);
return `<html>

${head}

<body id="video">
    <div id="banner">
        <img src="/images/cat-logo.jpg" />
        <h1>jessflix</h1>
        <a class="btn" href="https://www.youtube.com/channel/UC2ruDanoGlRILpCEfJn_BUA?sub_confirmation=1">subscribe on
            youtube</a>

    </div>
    <div class="container">
        <div class="col-12">
            <h1 class="title">${data.title}</h1>
            <a href="/" class="btn see-all">See all videos</a>
            <iframe id="player" style="width: 100%" src="https://www.youtube.com/embed/${data.id}" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${description}</p>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(window).on("load resize", function () {
            var w = $('#player').width();
            var h = w / 1.67;
            $('#player').height(h).width('100%');
        });
    </script>
</body>

</html>`
}
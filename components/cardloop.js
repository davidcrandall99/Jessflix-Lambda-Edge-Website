let videoList = (data) => {
    let content = "";
    for (i in data) {
        //console.log(data[i])
        
        let thumbnails = JSON.parse(data[i].thumbnails);
        let thumbnail = thumbnails.medium.url;
        let link = data[i].uri;
        let title = data[i].title;
        let description = data[i].description;
        description = description.substring(0, description.indexOf('.'));

        let id = data[i].id;

        content = content + `<div class="card" id=${id}>
            <a href="${link}" class="thumbnail">
                <img src="${thumbnail}" alt="Thumbnail for The Nun Review (spoilers)" />

            </a>
            <p class="title">${title}</p>
            <p class="description">${description}.</p>
            <a href="/${link}/" class="btn rot-135">Watch Now &#9658;</a>
        </div>
        `;
    
}
    if (typeof content !== "undefined") {
        return content;
    }
}
module.exports = videoList;
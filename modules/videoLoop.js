let videoLoop = (video) => {
    var thumbnails = JSON.stringify(video.thumbnails);
    return `
    <div id="#${video.id}">
        <a href="${video.videoUrl}">
            <img src="${thumbnails.high.url}" />
            <p>${video.title}</p>
        </a>
        <p>${video.description}</p>
    </div>
    `;
}

module.exports = videoLoop;



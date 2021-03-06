let trendingTagsURL =
    "https://api.giphy.com/v1/trending/searches?api_key=w7ZAodGXDUxFqLwIJWh4zAvR2npH0IfI";
let trendingGifURL =
    "https://api.giphy.com/v1/gifs/trending?api_key=w7ZAodGXDUxFqLwIJWh4zAvR2npH0IfI";

const trending = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

const displayTrendTags = async () => {
    const arr = await trending(trendingTagsURL);

    const trends = document.querySelectorAll(".trends");

    for (let i = 0; i < trends.length; i++) {
        trends[i].innerHTML = arr.data[i] + ", ";
        trends[i].setAttribute("onclick", "search('" + arr.data[i] + "', 0 )");
    }
};

displayTrendTags();

const displayTrendGifs = async (limit) => {
    $trendGifs.innerHTML = "";
    const arr = await trending(trendingGifURL + "&limit=" + limit);
    console.log(arr.data[0].images.original.url);
    arr.data.forEach((i) => {
        const div = document.createElement("div");
        div.classList.add("result_container");
        div.innerHTML = `<img class="gif_result" onclick="showMax('nofav',' ${i.images.original.url}','${i.username}','${i.title}')" src="${i.images.original.url}" alt="${i.title}"></img>
            <div class="gif_hover">
                <div class="gif_icons">
                <div class="icon iconFav" onclick="addFav('${i.images.original.url}','${i.username}','${i.title}')"></div>
                    <div class="icon iconDownload"  onclick="downloadGif('${i.images.original.url}','${i.title}')"></div>
                    <div class="icon iconBig"  onclick="showMax('nofav',' ${i.images.original.url}','${i.username}','${i.title}')"></div>
                </div>
                <div class="gif_details">
                    <p class="gif_user">${i.username}</p>
                    <h5 class="gif_title">${i.title}</h5>                          
                </div>
            </div>`;

        $trendGifs.appendChild(div);
    });
};

displayTrendGifs(12);
offsetTrend = 0;
const rightArrowTrend = () => {
    $trendGifs.scrollLeft += 400;
};

const leftArrowTrend = () => {
    $trendGifs.scrollLeft -= 400;
};

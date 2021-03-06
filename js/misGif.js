let arrMisGif;
//! FUNCION QUE RECIBE ID Y AGREGA DATOS DEL GIF A ARR DE MIS GIFS
const fetchIdMiGif = async (id) => {
    let res = await fetch(
        "https://api.giphy.com/v1/gifs?ids=" +
            id +
            "&api_key=w7ZAodGXDUxFqLwIJWh4zAvR2npH0IfI"
    );
    let migif = await res.json();
    console.log(migif);

    addMisGif(migif.data[0].images.downsized.url, "User", "Sin Titulo");
};

let arrGifsId;

//! INICIALIZA ARRAY SEGUN LOCALSTORAGE
if (localStorage.getItem("MisGifs") === null) {
    arrMisGif = [];
    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
} else {
    arrMisGif = JSON.parse(localStorage.getItem("MisGifs"));
}

//! AGREGA A MIS GIF
const addMisGif = (url, user, title) => {
    let miGif = {
        user: user,
        title: title,
        url: url,
    };

    arrMisGif.push(miGif);

    console.log(arrMisGif);

    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
    populateMisGif();
};

//! BORRA DE MIS GIF
const deleteMisGif = (url) => {
    for (let i = 0; i < arrMisGif.length; i++) {
        if (arrMisGif[i].url === url) {
            arrMisGif.splice(i, 1);
        }
    }
    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
    populateMisGif();
};

//! MUESTRA MIS GIFS
const populateMisGif = () => {
    const misGifLocalStorage = JSON.parse(localStorage.getItem("MisGifs"));
    $misGifGallery.innerHTML = "";
    let errMisGif;
    if (misGifLocalStorage.length == 0) {
        if (window.innerWidth < 800) {
            errMisGif = "(solo disponible en version escritorio)";
        } else {
            errMisGif = "";
        }
        $misGifGallery.innerHTML = `
        <div class ="error-container">
        <img class="error-img"  src="assets/icon-mis-gifos-sin-contenido.svg" alt="Sin resultados de busqueda" >
        <h4 class="error-text">¡Animate a crear tu primer GIFO!</h4>
        <p>${errMisGif}</p>
        </div> `;
    } else {
        for (let i = 0; i < misGifLocalStorage.length; i++) {
            const gifContainer = document.createElement("div");
            gifContainer.classList.add("result_container_misGif");
            gifContainer.innerHTML = `<img onclick="showMax('gifo','${misGifLocalStorage[i].url}','${misGifLocalStorage[i].user}','${misGifLocalStorage[i].title}')" class="gif_result" src="${misGifLocalStorage[i].url}" alt="${misGifLocalStorage[i].title}"></img>
            <div class="gif_hover hide">
            <div class="gif_icons">
                <div class="icon iconTrash" onclick="deleteMisGif('${misGifLocalStorage[i].url}')"></div>
                <div class="icon iconDownload" onclick="downloadGif('${misGifLocalStorage[i].url}','${misGifLocalStorage[i].title}')"></div>
                <div class="icon iconBig" onclick="showMax('gifo','${misGifLocalStorage[i].url}','${misGifLocalStorage[i].user}','${misGifLocalStorage[i].title}')"></div>
            </div>
            <div class="gif_details">
                <p class="gif_user">${misGifLocalStorage[i].user}</p>
                <h5 class="gif_title">${misGifLocalStorage[i].title}</h5>                          
            </div>
            </div>`;

            $misGifGallery.appendChild(gifContainer);
        }
    }
};

populateMisGif();

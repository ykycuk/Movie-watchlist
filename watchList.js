let searchContent = ""
let watchList = document.getElementById("mainContentWatchList")
let watchListContent = (JSON.parse(localStorage.getItem("watchList")))

function renderWatchList(arrMovie) {

    // console.log(arrMovie)
    arrMovie.map(movie => {
            watchList.innerHTML = ""
            // console.log(movie)
            fetch(`https://www.omdbapi.com/?i=${movie}&plot=full&apikey=5eedcfcf`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    let filmBlock = `
                            <div class="imgAndSection">
                                <img src="${data.Poster}" class="imgFilm"/>
                                <section class="sectionFilm1">
                                    <div class="nameAndRating">
                                        <h4>${data.Title}</h4>
                                        <img src="img/star.png" class="star"/>
                                        <p class="rating">${data.imdbRating}</p>
                                    </div>
                                    <div class="filmInfo">
                                        <p class="time">${data.Runtime}</p>
                                        <p>${data.Genre}</p>
                                        <div class="btn-watchList1" id="btn-watchList${movie}">
                                            <img src="img/icon_plus.png"/>
                                            <p>Watchlist</p>
                                        </div>
                                    </div>
                                    <p class="description">
                                        ${data.Plot}
                                    </p>
                                </section>
                            </div>
                            <hr class="line"/>
                        `
                        searchContent += filmBlock
                        watchList.innerHTML = searchContent
                        // console.log(watchList)
                })
    })
}

renderWatchList(watchListContent)
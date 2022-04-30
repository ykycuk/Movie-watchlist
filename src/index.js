let renderFilm = document.getElementById("mainContent")
let addFilmToMain = document.getElementById("mainContentWatchList")
let searchContent = "" //проходимся по массиву и добавляем текст с фильмами в эту переменную
let watchListContent = []
const search = document.getElementById("searcher")
const filmName = document.getElementById("filmName")
const main = document.getElementById('mainContent')
let arrIdFilms = []



if(search) { //this "if" is for fix error in console when on the second page in watchList serch button doesn't exist
    search.addEventListener("click", e => {
        e.preventDefault()
        let name = filmName.value
        filmName.value = ""
        main.classList.remove('mainContent');
        main.classList.add('mainContentFilms');
        render(name)
    })
}



function render(name) {
    arrIdFilms = []
    console.log(renderFilm)
    fetch(`https://www.omdbapi.com/?s=${name}&plot=full&apikey=5eedcfcf`)
        .then(res => res.json())
        .then(data => {
            let films = data.Search
            films.map(film => {
                let id = film.imdbID
                arrIdFilms.push(id)
                fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=5eedcfcf`)
                    .then(res => res.json())
                    .then(data => {
                        let filmBlock = `
                            <div class="imgAndSection">
                                <img src="${data.Poster}" class="imgFilm"/>
                                <section class="sectionFilm">
                                    <div class="nameAndRating">
                                        <h4>${data.Title}</h4>
                                        <img src="img/star.png" class="star"/>
                                        <p class="rating">${data.imdbRating}</p>
                                    </div>
                                    <div class="filmInfo">
                                        <p class="time">${data.Runtime}</p>
                                        <p>${data.Genre}</p>
                                        <div class="btn-watchList" id="btn-watchList${id}">
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
                            renderFilm.innerHTML = searchContent
                                arrIdFilms.map(id => {
                                    if(document.getElementById(`btn-watchList${id}`)) {
                                        document.getElementById(`btn-watchList${id}`).addEventListener("click", e => {
                                            e.preventDefault()
                                            if(localStorage.getItem("watchList")) {
                                                // watchListContent = JSON.parse(localStorage.getItem("watchList"))
                                                if(!watchListContent.includes(id)) {
                                                    watchListContent.push(id)
                                                    localStorage.setItem("watchList", JSON.stringify(watchListContent))
                                                }
                                            } else {
                                                watchListContent.push(id)
                                                localStorage.setItem("watchList", JSON.stringify(watchListContent))
                                            }
                                            // localStorage.clear()         
                                        })
                                    }
                                })
                    })
            }) 
            searchContent = ""
        })
}
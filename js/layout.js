let rootElement = document.querySelector("body")
//console.log(rootElement);

//adding header, main and footer 

let header = document.createElement("header")
header.innerHTML = `
<nav class="header__nav">
            <img class="icon dark-mode__svg" src="img/menu.svg" alt="image of an icon ">
            <h1>MyMovies</h1>
            <div class="ckeck-box__container">
                <label class="switch">
                <input type="checkbox" class ="switch__elm" id="switch__elm">
                <span class="slider round"></span>
</nav>
`
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("[data-dark='true']");
    const checkbox = document.querySelector("#switch__elm");

    if (container && checkbox) {
        checkbox.checked = true; // Check the box when data-dark="true"
        console.log(checkbox)
        console.log(container)
    }
});


/* --------------------------------main-------------------------------- */
let main = document.createElement("main")

let movieList = document.createElement("article")
movieList.classList.add("movies__container")
movieList.innerHTML = `
<header class="movies__container__header">
            <h1>Now Showing</h1>
            <button class="see__more__btn dark-mode-btn">See more</button>
</header>
<div class="movie__list"></div>
`

let popularMovies = document.createElement("article")
popularMovies.classList.add("popular__movies")
popularMovies.innerHTML = `
  <header class="movies__container__header popular__header">
         <h1>Popular</h1>
         <button class="see__more__btn dark-mode-btn load__pop__btn">See more</button>
     </header>
     <div class="popular__movie__list"></div>
`
main.append(movieList, popularMovies)


/* -----------------------------------footer--------------------------------------- */

let footer = document.createElement("footer")
footer.innerHTML = `
 <div class="footer__nav">
            <img class="footer__icon movie__icon" src="img/movie-icon.svg" alt="icon" data-dark = "http://127.0.0.1:5501/img/movie-icon-dark.svg">
            <img class="footer__icon__svg" src="img/ticket-icon.svg" alt="ticket -icon">
            <img class="footer__icon__svg" src="img/save-icon.svg" alt="save-icon">
        </div>
` 
rootElement.append(header, main, footer)


/* ------------------------------------DARK MODE SVG--------------------------------------------- */

    let switchElm = header.querySelector(".switch__elm")
    //console.log(switchElm);
    let movieIcon = document.querySelector(".movie__icon")

    if (localStorage.getItem("isDarkMode") == "true") {
        //console.log("light-mode");
        switchElm.checked
        movieIcon.src = movieIcon.dataset.dark
    } else{
        //console.log("dark-mode");
        movieIcon.src = "http://127.0.0.1:5501/img/movie-icon.svg"
        switchElm.checked
    }


    svgDarkMode()
    function svgDarkMode(){         
        switchElm.addEventListener("change", function(){
            if (!switchElm.checked || switchElm == undefined) {
                //console.log("also light-mode");
                movieIcon.src = "http://127.0.0.1:5501/img/movie-icon.svg"
            } else{
                //console.log("also dark-mode");
                movieIcon.src = movieIcon.dataset.dark
            }
            
        })

    }
    


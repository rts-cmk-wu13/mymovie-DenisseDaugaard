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

let main = document.createElement("main")

let footer = document.createElement("footer")
footer.innerHTML = `
 <div class="footer__nav">
            <img class="footer__icon movie__icon" src="img/movie-icon.svg" alt="icon" data-dark = "http://127.0.0.1:5501/img/movie-icon-dark.svg">
            <img class="footer__icon__svg" src="img/ticket-icon.svg" alt="ticket -icon">
            <img class="footer__icon__svg" src="img/save-icon.svg" alt="save-icon">
        </div>
` 
rootElement.append(header, main, footer)



    let switchElm = header.querySelector(".switch__elm")
    //console.log(switchElm);
    let movieIcon = document.querySelector(".movie__icon")

    if (localStorage.getItem("isDarkMode") == "true") {
        console.log("light-mode");
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
                console.log("also light-mode");
                movieIcon.src = "http://127.0.0.1:5501/img/movie-icon.svg"
            } else{
                console.log("also dark-mode");
                movieIcon.src = movieIcon.dataset.dark
            }
            
        })

    }
    


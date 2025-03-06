let rootElement = document.querySelector("body")
console.log(rootElement);

//adding header, main and footer 

let header = document.createElement("header")
header.innerHTML = `
<nav class="header__nav">
            <img class="icon dark-mode__svg" src="img/menu.svg" alt="image of an icon ">
            <h1>MyMovies</h1>
            <div class="ckeck-box__container">
                <label class="switch">
                <input type="checkbox" id="switch__elm">
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

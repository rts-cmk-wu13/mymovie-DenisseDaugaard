function darkMode (){
    let rootElm = document.documentElement
    let switchElm = document.querySelector("#switch__elm")
    //console.log(rootElm);
    //console.log(switchElm);
    let IsDarkMode = readFromLocalStorage("isDarkMode")
    let browserDark = window.matchMedia("(prefers-color-scheme:dark)").matches
    let movieIcon = document.querySelector(".movie__icon")
    //console.log(movieIcon); 
    
    //console.log(switchElm);
    //console.log(IsDarkMode);
    //console.log(browserDark);
   
    let darkState = null

    if(IsDarkMode == null){
        darkState = browserDark
    } else {
        darkState = IsDarkMode
    }


    if(IsDarkMode || browserDark){
        switchElm.checked = true 
        rootElm.setAttribute("data-dark", switchElm.checked)
        movieIcon.src = movieIcon.dataset.dark
    } 

    if(IsDarkMode  == false || !browserDark){
        switchElm.checked = false 
        rootElm.setAttribute("data-dark", switchElm.checked)
        movieIcon.src = "http://127.0.0.1:5501/img/movie-icon.svg"
    }
        

    switchElm.addEventListener("change", function(){
        console.log(switchElm.checked);
        saveToLocalStorage("isDarkMode", switchElm.checked)

        if(switchElm.checked){
            rootElm.setAttribute("data-dark", switchElm.checked)
        }else{
        rootElm.setAttribute("data-dark", switchElm.checked) // here we write the same, because "else"
                                                                // depends on the if statement, it could be true or false!!!!!
        }

                // Update the movie icon dynamically
        if (switchElm.checked) {
            movieIcon.src = movieIcon.dataset.dark;
        } else {
            movieIcon.src = "http://127.0.0.1:5501/img/movie-icon.svg";
        }
    })


        function saveToLocalStorage (key, value){
            localStorage.setItem(key, JSON.stringify(value))
            return "Data was saved with the key" + key
        }

        function readFromLocalStorage (key){
            return JSON.parse(localStorage.getItem(key))
        }
        
    }

    darkMode ()

    
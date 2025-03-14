function darkMode (){
    let rootElm = document.documentElement
    let switchElm = rootElm.querySelector("#switch__elm")
    //console.log(rootElm);
    //console.log(switchElm);
    let IsDarkMode = readFromLocalStorage("isDarkMode")
    let browserDark = window.matchMedia("(prefers-color-scheme:dark)").matches
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
    } 

    if(IsDarkMode  == false || !browserDark){
        switchElm.checked = false 
        rootElm.setAttribute("data-dark", switchElm.checked)
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

    
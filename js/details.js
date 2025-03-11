let detailsBody= document.documentElement.querySelector("body")
//console.log(detailsBody);
detailsBody.classList.add("details__body")

let detailsHeader = detailsBody.querySelector("header")
detailsHeader.innerHTML = `
    <nav class="details__header__nav">
     <a href="javascript: history.back()"><i class="fa-solid fa-arrow-left" style="color: #FFFF;"></i></a>
     <div class="ckeck-box__container">
         <label class="switch">
         <input type="checkbox" class ="switch__elm" id="switch__elm">
         <span class="slider round"></span>
         </label>
     </div>
   </nav>
`

let favorites = readFromLocalStorage("favoriteMovies") || []

let params = new URLSearchParams(window.location.search)
//console.log(params);
let movieId = params.get("id")
//console.log(movieId);

function formatMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}

const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(details =>{
    console.log(details);

    let movieDetails = document.createElement("article")
    movieDetails.classList.add("movie__details")
    movieDetails.innerHTML = `
    <section class="hero">
        <img class="hero__img" src="https://image.tmdb.org/t/p/original/${details.backdrop_path}" alt="backprop of the movie ${details.original_title}">
    </section>
    <section class="movie__details__info">
        
            <header class="movie__details__header">
                <h1 class="details__movie__title">${details.original_title}</h1>
                <i class="fa-regular fa-bookmark save" data-name="${details.original_title}"></i>
            </header>
    
            <div class="popular__movie__raiting">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <p class="movie__popularity grey__text">${Math.round(details.vote_average * 10) / 10} /10 IMDb</p>
            </div>
            <div class="popular__movie__genre">
                    ${details.genres.map(genre =>`
                    <p class="popular__genres">${genre.name}</p>
                    `).join("")}
            </div>  
            <div class="details__movie__specs">
                <span class="lenght__specs">
                    <p class="details__movie__specs__title">Lenght</p>
                    <p class="details__movie__specs__content">${formatMinutes(details.runtime)}</p>
                </span>        
                <span class="language__specs">
                    <p class="details__movie__specs__title">Language</p>
                    ${details.spoken_languages.map(language => `
                        <p class="details__movie__specs__content">${language.english_name}</p>
                        `).join("")}
                </span>        
                <span class="rating__specs">
                    <p class="details__movie__specs__title">Rating</p>
                    <p class="details__movie__specs__content">${ rating()}</p>
                </span>        
            </div>

        <section>
            <h1 class="movie__details__description__title">Description</h1>
            <p class="grey__text">${details.overview}</p>
        </section>

        <section class="details__movie__cast">
            <header class="movies__container__header">
                    <h1>Cast</h1>
                    <button class="see__more__btn  cast__btn">See more</button>
            </header>
            <div class="cast__list">
                ${details.credits.cast.map(castElm => `
                <section class="cast__card">
                    <figure class="cast__img__container">
                    <img class="cast__list__img" src="https://image.tmdb.org/t/p/w500${castElm.profile_path}" srcset="https://image.tmdb.org/t/p/w500${castElm.profile_path} 100w" alt="picture of ${castElm.name}">
                    </figure>
                    <figcaption>${castElm.name}</figcaption>
                </section>
                `).join("")}
            </div>
        </section>
       
    </section>
    `

    function rating() {
        let rating = details.release_dates.results.filter(country => country.iso_3166_1 == 'US');
    
        let certifications = rating.flatMap(elm => 
            elm.release_dates
                .map(certifiElm => certifiElm.certification.trim()) // Get certification values
                .filter(certi => certi !== "") // Remove empty values
        );
    
        return certifications.length > 0 ? certifications[0] : "NA"; 
        //this is a ternary operator (a shorthand for an if-else statement)
    }

    detailsBody.querySelector("main").append(movieDetails)



    let currenIcon = document.querySelector(".fa-bookmark")
    //console.log(currenIcon);
    if(favorites.includes(currenIcon.dataset.name)){
        currenIcon.classList.add("fa-solid")
        currenIcon.classList.add("saved")
    }

    let saveIcon = document.querySelector(".save")
    saveMovies()
    function saveMovies(){
        //console.log(saveIcon);
        saveIcon.addEventListener("click", function(event){
            let currendName = event.target.dataset.name

            console.log(currendName);
            if(favorites.includes(currendName)) {
                let newFavorites = favorites.filter(nameElm => nameElm != currendName)
                event.target.classList.remove("saved")
                favorites = newFavorites
                event.target.classList.remove("fa-solid")
                //console.log(favorites);
               } else{ 
               favorites.push(currendName)
               event.target.classList.add("saved")
               event.target.classList.add("fa-solid")

               console.log(favorites);
              }
   
              saveToLocalStorage("favoriteMovies", favorites)
            
        })
   }

    moreCast ()
    function moreCast (){

        let castBtn = document.querySelector(".cast__btn")
            //console.log(castBtn);
            let moreCastElms = document.querySelectorAll('.cast__card:nth-child(n+5)')
            //console.log(moreCastElms);
            let hideCastBtn = document.createElement("button")
            hideCastBtn.classList.add("see__more__btn", "show__less__btn")
            hideCastBtn.textContent = "Show less"
            castBtn.addEventListener("click", function(event){
                if(event.target){
                    castBtn.classList.add("cast__btn--hidden")
                    moreCastElms.forEach(castElm =>{
                        castElm.style.display =  "grid"
                        document.querySelector(".details__movie__cast").append(hideCastBtn)
                    })
                }
            })

            hideCastBtn.addEventListener("click", function(event){
                if(event.target){
                    moreCastElms.forEach(castElm =>{
                        castElm.style.display =  "none"
                        castBtn.classList.remove("cast__btn--hidden")
                        hideCastBtn.remove()
                    })
                }
            })

            
            document.querySelectorAll(".cast__list__img").forEach(img => {
            img.onerror = function () {
                this.onerror = null;  // Prevent looping
                this.src = "img/placeholder.png"; // Set your placeholder image
                this.classList.add("cast__placeholder__img")
                this.srcset ="img/placeholder.png 88w"
            };
        })

    } 
    
}).catch(err => console.error(err));// end of details fetch



        function saveToLocalStorage (key, value){
            localStorage.setItem(key, JSON.stringify(value))
            return "Data was saved with the key" + key
        }
    
    
        function readFromLocalStorage (key){
            return JSON.parse(localStorage.getItem(key))
        }
    
        function deleteFromLocalStorage (key){
            localStorage.removeItem(key)
           return "the element" + key + "was deleted."
        }


   

    function save (){
        rating.forEach(elm =>{
            //console.log(elm.release_dates);
            let certification = elm.release_dates
            //console.log(certification)
            certification.forEach(elm => {
             //console.log(elm.certification);
            let movieCerti = elm.certification
            
            if (movieCerti != ""){
             console.log(movieCerti);
            }
         
            })
     
            })
    }       

    

   
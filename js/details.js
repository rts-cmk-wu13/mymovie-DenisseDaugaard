let params = new URLSearchParams(window.location.search)
console.log(params);
let movieId = params.get("id")
//console.log(movieId);

function formatMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=189631aa3c5e912051d4d2bcb67373cb`,
{
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
  })
.then(response => response.json())
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
                <h1>${details.original_title}</h1>
                <i class="fa-regular fa-bookmark"></i>
            </header>
    
            <div class="popular__movie__raiting">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <p class="movie__popularity grey__text">${Math.round(details.vote_average * 10) / 10} /10 IMDb</p>
            </div>
            <div class="popular__movie__genre">
                    ${details.genres.map(genre =>`
                    <p class="popular__genders">${genre.name}</p>
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
                    <p class="details__movie__specs__content">PG-13</p>
                </span>        
            </div>

        <section>
            <h1 class="movie__details__description__title">Description</h1>
            <p class="grey__text">${details.overview}</p>
        </section>

        <section class="details__movie__cast">
            <header class="movies__container__header">
                    <h1>Cast</h1>
                    <button class="see__more__btn dark-mode-btn cast__btn">See more</button>
            </header>
            <div class="cast__list"></div>
        </section>

    </section>
    `
    document.querySelector("main").append(movieDetails) 
}) // end of detais fetch


fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=189631aa3c5e912051d4d2bcb67373cb`,
    {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
      })
    .then(response => response.json())
    .then(credits =>{
       console.log(credits);
        
      
       let castList = document.querySelector(".cast__list");
       //console.log(castList);
       castList.innerHTML = `
       ${credits.cast.map(castElm => `
            <figure class="cast__img__container">
            <img class="cast__list__img" src="https://image.tmdb.org/t/p/w500${castElm.profile_path}" alt="picture of ${castElm.name}">
            <figcaption>${castElm.name}</figcaption>
            </figure>
        `).join("")}`

    console.log(document.querySelectorAll(".cast__list__img"))
         moreCast ()

   function moreCast (){

       let castBtn = document.querySelector(".cast__btn")
        //console.log(castBtn);
        let moreCastElms = document.querySelectorAll('.cast__img__container:nth-child(n+5)')
        //console.log(moreCastElms);
        let hideCastBtn = document.createElement("button")
        hideCastBtn.classList.add("see__more__btn", "show__less__btn")
        hideCastBtn.textContent = "Show less"
           castBtn.addEventListener("click", function(event){
               if(event.target){
                castBtn.classList.add("cast__btn--hidden")
                   moreCastElms.forEach(castElm =>{
                       castElm.style.display =  "block"
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

   } 

   document.querySelectorAll(".cast__list__img").forEach(img => {
    img.onerror = function () {
        this.onerror = null;  // Prevent looping
        this.src = "img/placeholder.png"; // Set your placeholder image
        this.classList.add("cast__placeholder__img")
    };
})

}) // end of credits fetch

    
    
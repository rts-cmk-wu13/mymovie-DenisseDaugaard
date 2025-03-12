let testlinks = JSON.parse(sessionStorage.getItem("pokemonList")) || []
page = 1
popPage = 1

function loadMoreMovies(page){
const urlMovies = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'
  }
};

fetch(urlMovies, options)
  .then(res => res.json())
  .then(data => {
    //console.log(data);

        let movieList = document.querySelector(".movie__list")
        movieList.innerHTML += 
        
        data.results.map(movie => `
         <a class="movie__link" href='details.html?id=${movie.id}'>
         <section class="movie__card">
             <figure class="movie__container">
             <img class="movie__img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt='poster of the movie ${movie.original_title}'>
             </figure>

             <section>
                
                 <h2>${movie.original_title}</h2>
                     <div class="popular__movie__raiting">
                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                         <p class="grey__text">${Math.round(movie.vote_average * 10) / 10} /10 IMDb</p>
                     </div>
             </section>
         </section>
         </a>
             `).join("")
    
               
         var sentinel = document.querySelector(".movie__list a:nth-last-child(3)")
         //console.log(sentinel); 
         observer.observe(sentinel)  
                
         })// end of fetch data
       
         
       
}    
    



/* ----------------------------popular movies start here---------------------------------------------- */

function loadMorePopMovies(popPage){

        
        const urlPopular = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${popPage}`;
        const optionsPopular = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'
            }
        };

        fetch(urlPopular, optionsPopular)
        .then(res => res.json())
        .then(popular =>{

            let movieGenres = {
                28: "Action",
                12: "Adventure",
                16: "Animation",
                35: "Comedy",
                80: "Crime",
                99: "Documentary",
                18: "Drama",
                10751: "Family",
                14: "Fantasy",
                36: "History",
                27: "Horror",
                10402: "Music",
                9648: "Mystery",
                10749: "Romance",
                878: "Science Fiction",
                10770: "TV Movie",
                53: "Thriller",
                10752: "War",
                37: "Western"
             } 

        let poluparMoviesList = document.querySelector((".popular__movie__list"))
        poluparMoviesList.innerHTML += 
        popular.results.map(popularMovie => `
        <a class="pupular__movie__title" href='details.html?id=${popularMovie.id}'>
            <section class="popular__movie__container">
                <figure class="popular__movie__img__container">
                    <img src="https://image.tmdb.org/t/p/w500${popularMovie.poster_path}" alt="image of the movie ${popularMovie.original_title}">
                </figure>

                <section class="popular__movie__info">
                    <h2 class="pupular__movie__title">${popularMovie.original_title}</h2>
                        <div class="popular__movie__raiting">
                            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                            <p class=" grey__text">${Math.round(popularMovie.vote_average * 10) / 10} /10 IMDb</p>
                        </div>
                        <div class="popular__movie__genre">
                        ${popularMovie.genre_ids
                            .map(id => `<p class="popular__genres">${movieGenres[id] || "Unknown"}</p>`)
                            .join("")}
                        </div>
                </section>
        </section>
       </a>
       `).join("")

       var popSentinel = document.querySelector(".popular__movie__list a:nth-last-child(3)")
       //console.log(popSentinel);
       observer.observe(popSentinel)
       
      
    }) //end of popular fetch !!


}

        
const observer = new IntersectionObserver(function(entires){
    entires.forEach(function(entry){
        if(entry.isIntersecting){
            //her something happens!!!
            if(page >= 1 || popPage >= 1){
            page ++;
            popPage++;
                loadMoreMovies(page)
                loadMorePopMovies(popPage)
                observer.unobserve(entry.target)
            }
        }
    })
})


loadMoreMovies(page)
loadMorePopMovies(popPage)


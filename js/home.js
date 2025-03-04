
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=189631aa3c5e912051d4d2bcb67373cb",
{
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
})
.then(response => response.json())
.then(data =>{

    let movieList = document.createElement("article")
    movieList.classList.add("movies__container")
    movieList.innerHTML =`
    <header class="movies__container__header">
                <h1>Now Showing</h1>
                <button class="see__more_btn dark-mode-btn">See more</button>
    </header>
    <div class="movies__list">${data.results.map(movie =>`
        <section>
        <figure class="movie__container">
        <img class="movie__img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        </figure>
        <section>
         <a href='details.html?id=${movie.id}'>${movie.original_title}</a>
        <h2></h2>
         <div class="movie_popularity_container">
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <p class="movie__popularity grey__text">${movie.vote_average}/10 IMDb</p>
        </div>
        </section>
        </section>`).join("")}</div>`

    
    console.log(data);
    let popularMovies = document.createElement("article")
    popularMovies.classList.add("popular__movies")

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=189631aa3c5e912051d4d2bcb67373cb",
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
        })
        .then(response => response.json())
        .then(popular =>{
            //console.log(popular);
            let popularEng = popular.results.filter(movie => movie.original_language === "en")
            console.log(popularEng);
            popularMovies.innerHTML = `<header class="movies__container__header">
                 <h1>Popular</h1>
                 <button class="see__more_btn dark-mode-btn">See more</button>
            </header>`
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
                        
             let popularList = document.createElement("div")
             popularList.classList.add("popular__movies__list")
             popularList.innerHTML = `
             ${popularEng.map(movie => {
            let genresHTML = 
            movie.genre_ids.map(id => `<p class="popular__genders">${movieGenres[id] || "Unknown"}</p>`).join(""); 
             
                 return `
                <section class="popular__movies__container">
                     <figure class="popular__movie__img__container">
                         <img class="popular__movie__img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                     </figure>
                     <section class="popular__movie__info">
                         <h3>${movie.original_title}</h3>
                         <div class="popular__movie__raiting">
                             <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                             <p class="movie__popularity grey__text">${Math.round(movie.vote_average * 10) / 10} /10 IMDb</p>
                         </div>
                         <div class="popular__movie__genre">
                             ${genresHTML} <!-- Each genre is in its own <p> tag -->
                         </div>
                         <span class="popular__movie__duration">
                            <i class="fa-regular fa-clock"></i>
                        </span>

                     </section>
                </section>`;
                    }).join("")}`
            
            
            document.querySelector(".popular__movies").append(popularList)
        })
        document.querySelector("main").append(movieList, popularMovies)
    })// end of fetch popular
        
     

    // fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=189631aa3c5e912051d4d2bcb67373cb",
    //     {
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
    //     })
    //     .then(response => response.json())
    //     .then(genre=>{
           
    //     console.log(genre.genres);
        
           
    //     })//End of fetch genre



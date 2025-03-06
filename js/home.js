
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=189631aa3c5e912051d4d2bcb67373cb",
{
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODk2MzFhYTNjNWU5MTIwNTFkNGQyYmNiNjczNzNjYiIsIm5iZiI6MTc0MDk5MDUyMC4xNDMwMDAxLCJzdWIiOiI2N2M1NjgzOGEzMjc3YWI0YTFlNzY3MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OEUA7jI-KknE9ZdeN-pVfSw9Dq9cdiaB4jzvp4tAQbI'}
})
.then(response => response.json())
.then(data =>{

    let moviesEng = data.results.filter(movies => movies.original_language == "en")
    //console.log(moviesEng);// this give me only movies in english 

    let movieList = document.createElement("article")
    movieList.classList.add("movies__container")
    movieList.innerHTML = `
    <header class="movies__container__header">
                <h1>Now Showing</h1>
                <button class="see__more__btn dark-mode-btn">See more</button>
    </header>
    <div class="movies__list">
        ${moviesEng.map(movie => `
        <section>
        <figure class="movie__container">
        <img class="movie__img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        </figure>
        <section>
         <a href='details.html?id=${movie.id}'>${movie.original_title}</a>
        <h2></h2>
         <div class="movie_popularity_container">
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <p class="movie_popularity grey__text">${Math.round(movie.vote_average * 10) / 10} /10 IMDb</p>
        </div>
        </section>
        </section>
            `).join("")}
    </div>
    `
   
    
    let popularMovies = document.createElement("article")
    popularMovies.classList.add("popular__movies")
    popularMovies.innerHTML = `
     <header class="movies__container__header">
        <h1>Popular</h1>
        <button class="see__more__btn dark-mode-btn">See more</button>
    </header>
           
    `
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
            //console.log(popularEng);

            popularEng.forEach(movie => {
                fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=189631aa3c5e912051d4d2bcb67373cb`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer //your_token_here'
                    }
                })
                .then(response => response.json())
                .then(details => {


                   //console.log(details);
                   let movieSection = document.createElement("section")
                   movieSection.classList.add("popular__movies__container")
                   movieSection.innerHTML = `
                    <figure class="popular__movie__img__container">
                    <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="image of the movie ${details.original_title}">
                    </figure>
                    <section class="popular__movie__info">
                    <a href='details.html?id=${movie.id}'>${movie.original_title}</a>
                         <div class="popular__movie__raiting">
                             <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                             <p class="movie__popularity grey__text">${Math.round(movie.vote_average * 10) / 10} /10 IMDb</p>
                         </div>
                         <div class="popular__movie__genre">
                           ${details.genres.map(genre => `
                            <p class="popular__genders">${genre.name}</p>
                            `).join("")}
                         </div>
                         <span class="popular__movie__duration">
                            <i class="fa-regular fa-clock"></i>
                            <p class="movie__duration__runtime">${formatMinutes(details.runtime) }</p>
                        </span>

                    </section>
                   ` 
                        popularMovies.appendChild(movieSection);      
                   })
                   
                   
                   main.append(movieList , popularMovies)
               })
           })
       })

       
    
       // Function to format runtime
       function formatMinutes(minutes) {
           if (!minutes) return "N/A" // If runtime is unavailable
           let hours = Math.floor(minutes / 60)
           let remainingMinutes = minutes % 60
           return `${hours}h ${remainingMinutes}min`
       }
       
        
        
  
        




   


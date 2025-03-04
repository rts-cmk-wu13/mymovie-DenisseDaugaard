let params = new URLSearchParams(window.location.search)
console.log(params);
let movieId = params.get("id")
//console.log(movieId);

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
        <img src="https://image.tmdb.org/t/p/w500/${details.backdrop_path}" alt="backprop of the movie ${details.original_title}">
    </section>
    <section class="movie__details__info">
    
    </section>
    `
    document.querySelector("main").append(movieDetails) 
})// end of detais fetch
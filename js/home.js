
fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=189631aa3c5e912051d4d2bcb67373cb",
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
                <button class="see__more_btn">See more</button>
    </header>
    <div class="movies__list">${data.results.map(movie =>`
        <section>
        <figure class="movie__container">
        <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="">
        </figure>
        <section>
        <h1>${movie.original_title}</h1>
        </section>
        </section>`).join("")}</div>
            `
    console.log(data);

    document.querySelector("main").append(movieList)
})//fetch ends here
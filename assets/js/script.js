// movie search api logic 
$(document).ready(( )=> {
    $("#searchForm").on("submit", (e) => {
        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
 axios.get ("https://imdb-api.com/API/SearchTitle/k_u5eiz1tf/"+searchText)
 .then((response) => {
console.log(response);
let movies = response.data.results;
let output = "";
$.each(movies, (index, movie) => {
 output += `
 <div class="col-md-3">
    <div class="card offset-1 well text-center">
    <img src="${movie.image}">
    <h5><span class="background">${movie.title}<span></h5>
    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
    </div>
 </div>
 `;
});

$('#movies').html(output);
 })
 .catch((err) => {
     console.log(err);
 });

}

function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    window.location = "movie.html";
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem("movieId");

    axios.get ("https://imdb-api.com/API/Title/k_u5eiz1tf/"+movieId)
 .then((response) => {
console.log(response);
let movie = response.data;

let output = `
<div class="row">
    <div class="col-md-4">
        <img src="${movie.image}" class="thumbnail">
    </div>
    <div class="col-md-8">
        <h2>${movie.fullTitle}</h2>    
        <ul class="list-group">
            <li class="list-group-item"><strong>Genres: </strong>${movie.genres}</li>
            <li class="list-group-item"><strong>Awards: </strong>${movie.awards}</li>
            <li class="list-group-item"><strong>Description: </strong>${movie.plot}</li>
        </ul>
    </div>
</div>    
`;

$("#movie").html(output);
 })
 .catch((err) => {
     console.log(err);
 });
}


//recipe search logic

let searchButton = document.querySelector("#search")

//event listener to the button that send request to api when clicked

searchButton.addEventListener('click', ()=>{
    console.log('button clicked')
    sendApiRequest()
})

//asynchronomous function to fetch data from API
async function sendApiRequest() {
    let recipeText = $("#recipe-text").val();
    let APP_ID = "5fa6c14a"
    let API_KEY = "06b39f5e1cebc69ef4ae4c9a25b24763"
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${recipeText}`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

//function that process the data from API

function useApiData(data) {
   // 3 random recipe options        
document.querySelector("#content").innerHTML = `
<div class="row">
    <div class="card col-md-4 offset-1" style="width: 25rem;">
    <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.hits[0].recipe.label}</h5>
        <p class="card-text" style="color:white">Calories: ${data.hits[0].recipe.calories}</p>
        <a href="${data.hits[0].recipe.url}" target="_blank" class="btn btn-primary">See Recipe</a>
    </div>
    </div>

    <div class="card col-md-4 offset-1" style="width: 25rem;">
    <img src="${data.hits[1].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.hits[1].recipe.label}</h5>
        <p class="card-text" style="color:white">Calories: ${data.hits[1].recipe.calories}</p>
        <a href="${data.hits[1].recipe.url}" target="_blank" class="btn btn-primary">See Recipe</a>
    </div>
    </div>

    <div class="card col-md-4 offset-1" style="width: 25rem;">
    <img src="${data.hits[2].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.hits[2].recipe.label}</h5>
        <p class="card-text" style="color:white">Calories: ${data.hits[2].recipe.calories}</p>
        <a href="${data.hits[2].recipe.url}" target="_blank" class="btn btn-primary">See Recipe</a>
    </div>
    </div>

    
</div>
`;
    }







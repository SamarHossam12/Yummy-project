//html elements
var allMealsContainer = document.querySelector(".main-container");
var mealImage = document.querySelectorAll(".overlay ");
var mealContainer = document.querySelector(".meal-container");

//app variables
var data;
//functions
async function getMeals(){
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
     data = await response.json();
    displayAllMeals(data.meals);
    
}
getMeals();

function displayAllMeals(arr){
    for(var i= 0; i< arr.length; i++){
        allMealsContainer.innerHTML +=` <div class="col-md-3">
        <div class="image position-relative  rounded-2 overflow-hidden" >
          <img src="${arr[i].strMealThumb}" alt="" class="w-100 " >
          <div class="overlay">
                <h2>${arr[i].strMeal}</h2>
            </div>
        </div>
      </div>`
    }
}

// events
 for(var i=0; i< mealImage.length; i++){
    mealImage[i].addEventListener("click", function (e){
        allMealsContainer.classList.add("d-none");
        e.target.classList.remove("d-none");
        mealContainer.innerHTML += `<div class="col-md-6">
        <img src="${}" alt="">
        <h1>${}</h1>
      </div>
      <div class="col-md-6">
        <h2>Instructions</h2>
        <p>desfghj</p>
        <h2>Area:</h2>
        <h2>Category:</h2>
        <h2>Recipes:</h2>
      </div>`
    })
}

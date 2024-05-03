//html elements
var mainContainer = document.querySelector(".main-container");
var matchedMealsContainer = document.querySelectorAll(".matched-meals");

//app variables
var data;
var response;


//functions

//1st page
async function getMeals(){
     response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
     data = await response.json();
    displayAllMeals(data.meals);
}
getMeals();
function displayAllMeals(arr){
    for(var i= 0; i< arr.length; i++){
        mainContainer.innerHTML +=` <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="image position-relative  rounded-2 overflow-hidden" >
          <img src="${arr[i].strMealThumb}" alt="" class="w-100 " >
          <div class="overlay">
                <h2>${arr[i].strMeal}</h2>
            </div>
        </div>
      </div>`
    }
}


//meal details
async function getMealDetails(idMeal){
   var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
   var data = await response.json();
        showMealDetails( data.meals[0]);
  }
function showMealDetails(meal){
  var ingredients =" ";
  for(var i=0; i<=20; i++){
    if(meal[`strIngredient${i}`]){
     ingredients += `<li class="list-group-item list-group-item-secondary m-1" > ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  var tags = " ";
  var strTag = meal.strTags
  if (!strTag){
    strTag = []  }
  else{
    strTag = strTag.split(",");
  }
  // the previeous part may be replaced by:
  //  var strTag = meal.strTags?.split(",")
  //  if(!strTag) strTag = []
  for (let i = 0; i < strTag.length; i++) {
    tags += `
    <li class="list-group-item list-group-item-warning  m-1 ">${strTag[i]}</li>`
  }  

  mainContainer.innerHTML= " ";
  var mealContent =`
  <div class="col-md-4  ">
      <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
      <h1 class="" >${meal.strMeal}</h1>
  </div>
  <div class="col-md-8">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3>Area: ${meal.strArea}</h3>
      <h3>Category: ${meal.strCategory}</h3>
      <h3>Recipes:</h3>
      <ul class="list-group list-group-horizontal flex-wrap g-3 ">
       ${ingredients}
      </ul>
      <h3>Tags:</h3>
      <ul class="list-group list-group-horizontal flex-wrap g-3 ">
      ${tags}
      </ul>
      <a  target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
      <a  target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
  </div>`
mainContainer.innerHTML += mealContent  ;
}      


// search page
function displaySearchInputs(){
  mainContainer.innerHTML = " ";
  searchPage = `
  <div class="col-md-6">
    <input type="text" class="form-control bg-transparent text-white" id="searchByName" placeholder="Search By Name" oninput="searchMealByName(this.value);">
  </div>
  <div class="col-md-6">
      <input type="text" maxlength="1" class="form-control bg-transparent text-white" id="searchByfirstLetter" placeholder="Search By First Letter" oninput="searchMealByFisrtLetter(this.value);">
  </div>
  `
  mainContainer.innerHTML = searchPage;
}
async function searchMealByName(str){
  matchedMealsContainer.innerHTML = " ";
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`);
  data = await response.json();
  displayAllMeals(data.meals );
}
async function searchMealByFisrtLetter(str){
  matchedMealsContainer.innerHTML = " ";
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${str}`);
  data = await response.json();
  var x = data.meals ;
  if(x == null) x =[]
  displayAllMeals(x);
}

// categories page 
async function getCategories(){
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  data = await response.json();
  displayCategories(data.categories);
}
function displayCategories(arr){
  mainContainer.innerHTML = " ";
 for(var i= 0; i< arr.length; i++){
     mainContainer.innerHTML +=` 
     <div class="col-md-3">
     <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="image position-relative  rounded-2 overflow-hidden" >
       <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 " >
       <div class="overlay d-block text-center">
       <h3 >${arr[i].strCategory}</h3>
       <p class="h6">${arr[i].strCategoryDescription}</p>
         </div>
     </div>
   </div>`
 }
}
async function  getCategoryMeals(category){
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  data = await response.json();
  mainContainer.innerHTML = " ";
  displayAllMeals(data.meals);
}

// area page
async function getAreas(){
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  data = await response.json();
  displayAreas(data.meals);
}
function displayAreas(arr){
  mainContainer.innerHTML = " ";
 for(var i= 0; i< arr.length; i++){
     mainContainer.innerHTML +=` 
     <div class="col-md-3">
     <div onclick="getAreaMeals('${arr[i].strArea}')" class="image position-relative  rounded-2 overflow-hidden" >
     <i class="fa-solid fa-house-laptop fa-4x"></i>
       <h3 >${arr[i].strArea}</h3>
     </div>
   </div>`
 }
}
async function  getAreaMeals(area){
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  data = await response.json();
  mainContainer.innerHTML = " ";
  displayAllMeals(data.meals);
}

// ingredients page
async function getIngredients(){
  console.log("hu");
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  data = await response.json();
  console.log("hu");
  displayIngredients(data.meals.slice(0,20));
}
function displayIngredients(arr){
  mainContainer.innerHTML = " ";
  for(var i= 0; i< arr.length; i++){
     mainContainer.innerHTML +=` 
     <div class="col-md-3">
     <div onclick="getIngredientMeals('${arr[i].strIngredient}')" class=" image text-center" >
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3 >${arr[i].strIngredient}</h3>
        <p class="h6">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
     </div>
   </div>`
 }
}
async function  getIngredientMeals(ingredient){
  response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  data = await response.json();
  mainContainer.innerHTML = " ";
  displayAllMeals(data.meals);
}

// contact page
function displayContactPage(){
  mainContainer.innerHTML = " ";
  contactPage = `
  <div class="row g-4">
    <div class="col-md-6">
        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
        </div>
    </div>
    <div class="col-md-6">
        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
        </div>
    </div>
    <div class="col-md-6">
        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
        </div>
    </div>
    <div class="col-md-6">
        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
        </div>
    </div>
    <div class="col-md-6">
        <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
    </div>
    <div class="col-md-6">
        <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword 
        </div>
    </div>
  </div>
  <button type="submit" id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3 ">Submit</button>
  `
  mainContainer.innerHTML = contactPage;

  submitBtn = document.getElementById("submitBtn")

}
function inputsValidation() {
  if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")
  }
  if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")
  }
  if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
  }
  if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")
  }
  if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
  }
  if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
  }
  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
// events

 
// MICROSOFT 
// ActiveXObject
/*
GET -- get data from server
POST--send data to server
PUT-- update data on server
DELETE-delete data from
PATCH--update piece of data

httpRequest.readyState=0;   //connection not initizialed
httpRequest.readyState=1;   //connection established
httpRequest.readyState=2;   //request recieved
httpRequest.readyState=3;   //request proccessing
httpRequest.readyState=4;   //request finished and response ready
*/

//AJAX(async js and xml -> XMLHttpRequest)
var data = [];
getRecipes('pizza');

var links=document.querySelectorAll('.navbar .nav-link');
for(var i=0;i<links.length;i++)
{
  links[i].addEventListener('click',function(e){
    // var currentMeal= e.target.text;
    getRecipes(e.target.text)
  })
}
function getRecipes(meal) {
  var httpRequest = new XMLHttpRequest(); //new instance
  httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${meal}`); //establish connection
  httpRequest.send();

  httpRequest.addEventListener('readystatechange', function () {
    if (httpRequest.readyState == 4) {
      data = JSON.parse(httpRequest.response).recipes;
      console.log(data);
      displayData()
    }
  })
}


function displayData() {
  var cols = ``;
  for (var i = 0; i < data.length; i++) {
    cols +=
      `
    <div class="col-md-3 my-2">
      <div>
        <img class='w-100 recipe-img' src="${data[i].image_url}">
        <h5>${data[i].title}</h5>
        <a href='${data[i].source_url}' class='btn btn-info'>Source</a>
        <a onclick='getRecipeDetails(${data[i].recipe_id})' data-bs-toggle="modal" data-bs-target="#exampleModal" class='btn btn-warning'>details</a>
      </div>
     </div>
    `
  }
  document.getElementById('rowData').innerHTML = cols
}

async function getRecipeDetails(recipeId){
 var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
 var details=await response.json();
 var receipeDetailsData=
 `
    <img class='w-100 recipe-img' src='${details.recipe.image_url}'>
    <h2>${details.recipe.publisher}</h2>
 `
 document.getElementById('recipeData').innerHTML=receipeDetailsData
}
// function getPasta() {
//   return new Promise(function(callback){
//     var httpRequest = new XMLHttpRequest(); //new instance
//     httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=pasta`); //establish connection
//     httpRequest.send();

//     httpRequest.addEventListener('readystatechange', function () {
//       if (httpRequest.readyState == 4) {
//         data = JSON.parse(httpRequest.response).recipes;
//         console.log('pastaaaaaa',data);
//         callback();
//       }
//     })
//   })
// }


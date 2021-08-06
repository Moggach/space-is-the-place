const api_url =
'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10';

//Grabbing section
const section = document.querySelector(".image-container");

// Defining async function
async function getapi(url) {
// Storing response
const response = await fetch(url);

// Storing data in form of JSON
let data = await response.json();
let array = Array.from(data.latest_photos);
console.log(array);

array.forEach((element) => {
//section[0].appendChild(`<div class="section--image"><img src="${element.img_src}"></div>`)
console.log(section)}
);
}

// Calling async function
getapi(api_url);

//
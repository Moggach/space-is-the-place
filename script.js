//assigning endpoints to variables
const api_url_curiosity =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=999';

const api_url_opportunity =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=980';

const api_url_spirit =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=950';

const api_url_curiosity_front =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=FHAZ';

const api_url_curiosity_back =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=RHAZ';

const api_url_latest =

'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10';

//selecting image container
const section = document.querySelector('.image-container');
const loading = document.querySelector('.loading');

// Defining async function
async function getapi(url) {
  loading.innerHTML = `<img src= "/Rocket.gif"></img>`;
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  let data = await response.json();

  loading.innerHTML = ``;
  //if statement to deal with different shaped object coming back from latest photos endpoint
  if (url.includes('latest') == true) {
    
    let array = Array.from(data.latest_photos);

    array.forEach((element) => {

      section.innerHTML += `<div class="section--image"><img src="${element.img_src}" 
      alt="image from Mars rover ${element.rover.name} taken on ${element.earth_date}"></div>`;
    });
  } else {
    let array = Array.from(data.photos);

    array.forEach((element) => {
      section.innerHTML += `<div class="section--image"><img src="${element.img_src}" 
    alt="image from Mars rover ${element.rover.name} taken on ${element.earth_date}"></div>`;

    });
  }
}

//reset the content between selections
function reset() {

  loading.innerHTML = ' ';
  section.innerHTML = ' ';
}

//add event listener to rover select menu and run getapi function on change
document.getElementById('rover').addEventListener('change', function () {
  if (this.value == 'opportunity') {
    reset();

    getapi(api_url_opportunity);
  } else if (this.value == 'spirit') {
    reset();

    getapi(api_url_spirit);
  } else if (this.value == 'curiosity') {
    reset();

    getapi(api_url_curiosity);
  } else {
    reset();

  }
});

//add event listener to camera select menu and run getapi function on change

document.getElementById('camera').addEventListener('change', function () {
  if (this.value == 'front-hazard') {

    reset();
    getapi(api_url_curiosity_front);
  } else {
    reset();
    getapi(api_url_curiosity_back);
  }
});

//add event listener to date select menu and run getapi function on change

document.getElementById('date').addEventListener('change', function () {
  if (this.value == 'latest-curiosity') {
    reset();
    getapi(api_url_latest);
  }
});

//

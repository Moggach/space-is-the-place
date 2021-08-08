//assigning endpoints to variables

// ================= CURIOSITY =================

const api_url_curiosity =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=999&page=1";

const api_url_curiosity_front =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=FHAZ";

const api_url_curiosity_back =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=RHAZ";

const api_url_curiosity_latest =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

const api_url_curiosity_manifest =
  "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

// ================= OPPORTUNITY =================

const api_url_opportunity =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=980&page=1";

const api_url_opportunity_front =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=FHAZ";

const api_url_opportunity_back =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=RHAZ";

const api_url_opportunity_latest =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

const api_url_opportunity_manifest =
  "https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

// ================= SPIRIT =================

const api_url_spirit =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=950&page=1";

const api_url_spirit_front =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=FHAZ";

const api_url_spirit_back =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10&sol=100&camera=RHAZ";

const api_url_spirit_latest =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

const api_url_spirit_manifest =
  "https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit/?api_key=KtmZvO7i1yyVYq7m46Nhw0FYlgo1M2Lr6PW0XY10";

// select image marquee
const contentBar = document.querySelector(".content");

//selecting image container
const section = document.querySelector(".image-container");
const loading = document.querySelector(".loading");

// Defining async function
async function getapi(url) {
  loading.innerHTML = `<img src= "https://media.giphy.com/media/fiH7QU2QHoP5hD5b2d/giphy.gif"></img>`;
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  let data = await response.json();

  loading.innerHTML = ``;
  //if statement to deal with different shaped object coming back from latest photos endpoint
  if (url.includes("latest") == true) {
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

async function getapiManifest(url) {
  const response = await fetch(url);

  // Storing data in form of JSON
  let data = await response.json();
  console.log(data);
  contentBar.innerHTML =
    `<span class='red'>ROVER: ${data.photo_manifest.name}</span> <span class='green'>PHOTOS CAPTURED: ${data.photo_manifest.total_photos}</span> <span class='blue'>STATUS: ${data.photo_manifest.status} </span>`.repeat(
      20
    );
}

//reset the content between selections
function reset() {
  loading.innerHTML = " ";
  section.innerHTML = " ";
}

let rover = "";

//add event listener to rover select menu and run getapi function on change
document.getElementById("rover").addEventListener("change", function () {
  if (this.value == "opportunity") {
    reset();
    rover = "opportunity";
    getapi(api_url_opportunity);
    getapiManifest(api_url_opportunity_manifest);
  } else if (this.value == "spirit") {
    reset();
    rover = "spirit";
    getapi(api_url_spirit);
    getapiManifest(api_url_spirit_manifest);
  } else if (this.value == "curiosity") {
    reset();
    rover = "curiosity";
    getapi(api_url_curiosity);
    getapiManifest(api_url_curiosity_manifest);
  } else {
    reset();
  }
});

//add event listener to camera select menu and run getapi function on change

document.getElementById("camera").addEventListener("change", function () {
  if (this.value == "front-hazard" && rover === "curiosity") {
    reset();
    getapi(api_url_curiosity_front);
  } else if (this.value == "rear-hazard" && rover === "curiosity") {
    reset();
    getapi(api_url_spirit_back);
  } else if (this.value == "front-hazard" && rover === "spirit") {
    reset();
    getapi(api_url_spirit_front);
  } else if (this.value == "rear-hazard" && rover === "spirit") {
    reset();
    getapi(api_url_spirit_back);
  } else if (this.value == "front-hazard" && rover === "opportunity") {
    reset();
    getapi(api_url_opportunity_front);
  } else if (this.value == "rear-hazard" && rover === "opportunity") {
    reset();
    getapi(api_url_opportunity_back);
  }
});

//add event listener to date select menu and run getapi function on change

// document.getElementById("date").addEventListener("change", function () {
//   if (this.value == "latest-curiosity") {
//     reset();
//     getapi(api_url_curiosity_latest);
//   }
// });

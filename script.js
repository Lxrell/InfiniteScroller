const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash API
let imageCount = 5;
const apiKey = `icrI-v4BUygenymTrY5CiEix3Ka-s7kGqPslm2xkruc`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

//Check if all images were loaded
function imageLoaded(){

imagesLoaded++;
console.log(imagesLoaded);
if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 30;
}
}

//Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//Create Elements for Links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run funcgtion for each object in photos array
    photosArray.forEach((photo) => {
      //Create <a> to link to Unsplash
      const item = document.createElement('a');
    
      //Create <img> for photo
      const img = document.createElement('img');
    setAttributes(item, {
        href: photo.links.html, 
        target: '_blank',
    });
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading]
    img.addEventListener('load', imageLoaded);
      // put <img> inside <a> and then put noth inside imageContainer element
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
}



// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch Error here
    }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){

        ready = false
        getPhotos()
    }
});

//on load
getPhotos();
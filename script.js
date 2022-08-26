"use strict";

const btn = document.querySelector(".btn-country");
const countriesCointainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>
  `;
  countriesCointainer.insertAdjacentHTML("beforeend", html);
  countriesCointainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesCointainer.insertAdjacentText("beforeend", msg);
  countriesCointainer.style.opacity = 1;
};

// https://restcountries.com/v2/
//////////////////////////////////////////////////////////
//// First AJAX Call: XMLHttpRequest

// const renderCountry = function (data, className = "") {
//   const html = `
//   <article class="country ${className}">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
//   </article>
//   `;
//   countriesCointainer.insertAdjacentHTML("beforeend", html);
//   countriesCointainer.style.opacity = 1;
// };

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// // getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa");
// // getCountryAndNeighbour("malaysia");
// // getCountryData("germany");

// // callback hell
// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 second passed");
//     setTimeout(() => {
//       console.log("3 second passed");
//     }, 1000);
//   }, 1000);
// }, 1000);

////////////////////////////////////////////
//// Promises and Fetch API
// const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();
// Promise: an object that is used as a placeholder for the future result of an async operation
// a container for an async delivered value
// We no longer need to rely on events and callbacks passed into async functions to handle async results
// Instead of nesting callbacks, we can chain promises for a sequence of async operations: escaping callback hell
// Lifecyle:
// pending > (async task) > settled > fulfilled (success) || rejected (error)

// const request = fetch("https://restcountries.com/v2/name/portugal");
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // data that we need and convert to json
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"));
// };

// getCountryData("mexico");

////////////////////////////////////////////
//// Handling Rejected Promises

// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💣`);
//       renderError(`Something went wrong 😱 😱 😱 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesCointainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

// getCountryData("adasds");

////////////////////////////////////////////
//// Throwing Errors Manually

// const getJSON = function (url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// Example 1
// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       // Custom message
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = "asdkjalskd";

//       if (!neighbour) return;
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💣`);
//       renderError(`Something went wrong 😱 😱 😱 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesCointainer.style.opacity = 1;
//     });
// };

// Example 2
// const getCountryData = (country) => {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       console.log(neighbour);
//       // const neighbour = "asdkjalskd";

//       if (!neighbour) throw new Error("No neighbour found!");

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         "Country not found"
//       );
//     })

//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💣`);
//       renderError(`Something went wrong 😱 😱 😱 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesCointainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

// getCountryData("australia");

////////////////////////////////////////////
//// Coding Challenge 1
// Part 1:
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and longitude value ('lng')
// (these are GPS coordinates)
// 2. Do "reverse geocoding" of the provided coordinates. Reverse geocoding means to convert to a meaningful
// location, like a city and country name. Use this API to do reverse geocoding: https:/geocode.xyz/api
// The AJAX call will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.
// Do not use the 'getJSON' function.
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received
// about the provided location. Then, using this data, log a message like this to the console: "You are in Berlin, Germany"
// 4. Chain a .catch method to the end of the promise chain and log errors to the console.
// 5. This API allows to make only 3 request per second. If you reload fast, you will get this error with
// code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create
// an error to reject the promise yourself, with a meaning error message
// Part 2:
// 6. Now it's time to use the received data to render a country. So take the relevant attribute API result,
// and plug it into the countries API that we have been using
// 7. Render the country and catch any errors
// Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// Coordinates 2: 19.037, 72.873
// Coordinates 3: -33.933, 18.474

// const whereAmI = (lat, lng) => {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//       // console.log(data);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//     })
//     .catch((err) => console.error(`${err.message} 🤯`));
// };

// whereAmI(38.6991, -9.1775);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Example 1
// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       // Custom message
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = "asdkjalskd";

//       if (!neighbour) return;
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💣`);
//       renderError(`Something went wrong 😱 😱 😱 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesCointainer.style.opacity = 1;
//     });

// Example 2
// const getCountryData = (country) => {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       console.log(neighbour);
//       // const neighbour = "asdkjalskd";

//       if (!neighbour) throw new Error("No neighbour found!");

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         "Country not found"
//       );
//     })

//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💣`);
//       renderError(`Something went wrong 😱 😱 😱 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesCointainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

////////////////////////////////////////////
//// Event Loop
// console.log("Test Start");
// setTimeout(() => console.log("0 sec timer"), 0);
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));
// Promise.resolve("Resolved promise 2").then((res) => {
//   for (let i = 0; i < 1000; i++) {}
//   console.log(res);
// });
// console.log("Test End");

////////////////////////////////////////////
//// Building a simple promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("Lottery draw is happening 🔮");
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve("You WIN 🥳");
//     } else {
//       reject(new Error("You SUCKS 💩"));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log("I waited for 2 seconds");
//     return wait(1);
//   })
//   .then(() => console.log("I waited for 1 second"));

// Promise.resolve("abc").then((x) => console.log(x));
// Promise.reject(new Error("Problem!")).catch((x) => console.error(x));

////////////////////////////////////////////
//// Promisifying Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then((pos) => console.log(pos));

// const whereAmI = () => {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//       // console.log(data);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//     })
//     .catch((err) => console.error(`${err.message} 🤯`));
// };

// btn.addEventListener("click", whereAmI);

// Coding Challenge #2
// Part 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise
// which creates a new image(use document.createElement('img')) and sets the .src attribute to the provided image path
// 2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise
// The fulfilled value should be the image element itself. In case there is an error loading the image (listen for
// the 'error' event), reject the promise
// Part 2
// 4.Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause the execution for 2 seconds using the 'wait' function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS property to none) and load
// a second image (hint: use the image element returned by the 'createImage' promise to hide the current image
// You will need a global variable for that)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hided the current image
// Test data: images in the img folder. Test the error handler by passing a wrong image path
// Set the network speed to "Fast 3G" in the dev tools Network tab, otherwise images load too fast

// const img1 = "./img/img1.jpeg";
// const img2 = "./img/img2.jpeg";
// const img3 = "./img/img3.jpeg";
// const imageContainer = document.querySelector(".images");
// // img.style.visibility = visible ? "visible" : "hidden";

// const createImage = (imgPath) => {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = `${imgPath}`;
//     // const el = document.querySelector(".images");

//     // el.classList.add(img);
//     // img.classList.add("images");

//     img.addEventListener("load", () => {
//       imageContainer.append(img);
//       resolve(img);
//       // img.className = "images";
//     });

//     img.addEventListener("error", () => {
//       reject(new Error(`${img.src} failed to load`));
//     });
//   });
// };

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// let currentImg;

// createImage(img1)
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage(img2);
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage(img3);
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 3 loaded");
//     return wait(2);
//   })
//   .catch((err) => console.error(err));

// Consuming Promises with Async/Await

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async (country) => {
//   try {
//     // geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );
//     if (!resGeo.ok) throw new Error("Problem getting location data");
//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);

//     // Country Data
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.countryName}`
//     );
//     if (!res.ok) throw new Error("Problem getting country");

//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//   } catch (err) {
//     console.error(`${err} 😱`);
//     renderError(`😱 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// whereAmI();

// Returning values from async functions
// console.log("1: Will get location");
// // // const city = whereAmI();
// // // console.log(city);
// // whereAmI()
// //   .then((city) => console.log(city))
// //   .catch((err) => console.log(`2: 😱 ${err.message}`))
// //   .finally(() => console.log("3: Finished getting location"));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log(`3: Finished getting location`);
// })();
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (e) {
//   console.error(e.message);
// }

// Running promises in parallel

// const getJSON = function (url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`)
//     ]);
//     // console.log([data1.capital, data2.capital, data3.capital]);
//     console.log(data.map((d) => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries("portugal", "canada", "tanzania");

// Other Promise combinators
// Promise.race

// const getJSON = function (url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`)
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error("request took too long!"));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(5)
// ])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.log(err));

// Promise.allSettled
// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success")
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise.all([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success")
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise.any
// Promise.any([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success")
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Coding Challenge #3
// Your tasks:
// Part 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async / await (only the part where the promise is consumed, reuse the 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one you like more
// 3. Don't forget to test the error handler, and to set the network speed to "Fast 3G" in the dev tools network tab
// Part 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img1.jpeg', 'img/img2.jpeg', 'img/img3.jpeg'] to test, turn off the 'loadNPause' function

const img1 = "./img/img1.jpeg";
const img2 = "./img/img2.jpeg";
const img3 = "./img/img3.jpeg";
const imageContainer = document.querySelector(".images");

const createImage = (imgPath) => {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = `${imgPath}`;

    img.addEventListener("load", () => {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", () => {
      reject(new Error(`${img.src} failed to load`));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async () => {
  try {
    let img = await createImage(img1);
    console.log("Image 1 loaded");
    await wait(2);
    img.style.display = "none";

    img = await createImage(img2);
    console.log("Image 2 loaded");
    await wait(2);
    img.style.display = "none";

    img = await createImage(img3);
    console.log("Image 3 loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async (imgArr) => {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};

loadAll([img1, img2, img3]);

// createImage(img1)
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage(img2);
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage(img3);
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 3 loaded");
//     return wait(2);
//   })
//   .catch((err) => console.error(err));

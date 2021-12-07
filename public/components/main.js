// main.js

import { getPrivateRecipes } from '../../backend/private_recipe.js'

import { Router } from './Router.js'

const recipes = [
  // 'components/example.json'
  // 'https://introweb.tech/assets/json/birthdayCake.json',
  // 'https://introweb.tech/assets/json/chocolateChip.json',
  // 'https://introweb.tech/assets/json/stuffing.json',
  // 'https://introweb.tech/assets/json/turkey.json',
  // 'https://introweb.tech/assets/json/pumpkinPie.json'
]

const public_recipes = []

const recipeData = {} // You can access all of the Recipe Data from the JSON files in this variable

const router = new Router(function () {
  /**
   * TODO - Part 1 - Step 1
   * Select the 'section.section--recipe-cards' element and add the "shown" class
   * Select the 'section.section--recipe-expand' element and remove the "shown" class
   *
   * You should be using DOM selectors such as document.querySelector() and
   * class modifications with the classList API (e.g. element.classList.add(),
   * element.classList.remove())
   *
   * This will only be two single lines
   * If you did this right, you should see just 1 recipe card rendered to the screen
   */
  document.querySelector('section.section--recipe-cards').classList.add('shown')
  document.querySelector('section.section--recipe-expand').classList.remove('shown')
})

// let button = document.getElementById('test2Button');
// button.addEventListener('click', () => {
//   init();
// })

window.addEventListener('DOMContentLoaded', init)
let flag = false

// Initialize function, begins all of the JS code in this file
async function init () {
  //Initialize Time
  const today = new Date();
  const today_y = today.getFullYear();
  const today_m = today.getMonth();
  const today_d = today.getDate();
  const today_m_str = fullMonth(today_m);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tom_y = tomorrow.getFullYear();
  const tom_m = tomorrow.getMonth();
  const tom_d = tomorrow.getDate();
  const tom_m_str = fullMonth(tom_m);

  let today_h2 = document.getElementById("today_h2");
  today_h2.innerHTML = today_m_str + " " + today_d + ", " + today_y;
  let tomorrow_h2 = document.getElementById("tomorrow_h2");
  tomorrow_h2.innerHTML = tom_m_str + " " + tom_d + ", " + tom_y;
  // initializeServiceWorker();


  try {
    await fetchRecipes();
    await fetchPublicRecipes();
    flag = true
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`)
    return
  }

  // createRecipeCards();
  bindPopstate()
}

/**
 * Loading JSON into a JS file is oddly not super straightforward (for now), so
 * I built a function to load in the JSON files for you. It places all of the recipe data
 * inside the object recipeData like so: recipeData{ 'ghostcookies': ..., 'birthdayCake': ..., etc }
 */

async function fetchRecipes () {
  // TODO: call getPrivateRecipes() instead of this
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw 'User not login'
    } else {
      const data = []
      firebase.firestore()
        .collection('private_recipe')
        .where('UID', '==', user.uid.toString())
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const temp = doc.data()
            temp.id = doc.id
            recipes.push(temp)
          })
          if (recipes.length >= 1) {
            createRecipeCards()
          }
        })
        .catch((error) => {
          return error
        });
      }
  })
}

async function fetchPublicRecipes() {
  await firebase.firestore()
  .collection('public_recipe')
  .get()
  .then((querySnapshot) => {
    // const tempDoc = [];
    querySnapshot.forEach((doc) => {
      console.log(1, doc.data());
      console.log('asldifkhasdf')
      public_recipes.push(doc.data());
    })
    if (public_recipes.length >= 1) {
      createPublicRecipeCards()
    }
  })
  .catch((error) => {
    return error;
  });
}

function fullMonth(m){
  if(m == 0){
    return "Jan";
  }
  else if(m == 1){
    return "Feb"
  }
  else if(m == 2){
    return "Mar"
  }
  else if(m == 3){
    return "Apr"
  }
  else if(m == 4){
    return "May"
  }
  else if(m == 5){
    return "Jun"
  }
  else if(m == 6){
    return "Jul"
  }
  else if(m == 7){
    return "Aug"
  }
  else if(m == 8){
    return "Sep"
  }
  else if(m == 9){
    return "Oct"
  }
  else if(m == 10){
    return "Nov"
  }
  else if(m == 11){
    return "Dec"
  }
}

function createPublicRecipeCards() {
  // console.log(recipes)
  for (let i = 0; i < public_recipes.length; i++) {
    const recipeCard = document.createElement('public-recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    console.log(public_recipes[i]);
    recipeCard.data = public_recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    const page = public_recipes[i].name
    router.addPage(page, function () {
      document.querySelector('.section--recipe-cards').classList.remove('shown')
      document.querySelector('.section--recipe-expand').classList.add('shown')
      document.querySelector('recipe-expand').data = public_recipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipe-cards--wrapper').appendChild(recipeCard)
  }
}

/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards () {
  // Makes a new recipe card
  console.log(recipes)
  for (let i = 0; i < recipes.length; i++) {
    const recipeCard = document.createElement('recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    const page = recipes[i].name
    router.addPage(page, function () {
      document.querySelector('.section--recipe-cards').classList.remove('shown')
      document.querySelector('.section--recipe-expand').classList.add('shown')
      document.querySelector('recipe-expand').data = recipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipe-cards--wrapper').appendChild(recipeCard)
  }
}

/**
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard (recipeCard, pageName) {
  recipeCard.addEventListener('click', e => {
    if (e.path[0].nodeName == 'A') return
    else{
      router.navigate(pageName)
      console.log("lolbby")
    }
  })
}

/**
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
 */
function bindPopstate () {
  /**
   * TODO - Part 1 Step 6
   * Finally, add an event listener to the window object for the 'popstate'
   * event - this fires when the forward or back buttons are pressed in a browser.
   * If your event has a state object that you passed in, navigate to that page,
   * otherwise navigate to 'home'.
   *
   * IMPORTANT: Pass in the boolean true as the second argument in navigate() here
   * so your navigate() function does not add your going back action to the history,
   * creating an infinite loop
   */
  window.addEventListener('popstate', function (event) {
    if (event.state) {
      console.log("yesbbay")
      router.navigate(event.state.page, true)
    } else {
      router.navigate('home', true)
    }
  })
}

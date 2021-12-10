
window.addEventListener('DOMContentLoaded', init)
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const recipes = []
async function init(){
    const today_y = today.getFullYear();
    const today_m = today.getMonth();
    const today_d = today.getDate();
    const today_m_str = fullMonth(today_m);
    const today_day = fullDay(today.getDay());
  
    const tom_y = tomorrow.getFullYear();
    const tom_m = tomorrow.getMonth();
    const tom_d = tomorrow.getDate();
    const tom_m_str = fullMonth(tom_m);
    const tomorrow_day = fullDay(tomorrow.getDay());
  
    let today_h2 = document.getElementById("today_h2");
    today_h2.innerHTML = today_day + " | " + today_m_str + " " + today_d + ", " + today_y;
    let tomorrow_h2 = document.getElementById("tomorrow_h2");
    tomorrow_h2.innerHTML = tomorrow_day + " | " + tom_m_str + " " + tom_d + ", " + tom_y;

    let flag = false
    try {
      await fetchRecipes();
      flag = true
    } catch (err) {
      console.log(`Error fetching recipes: ${err}`)
      return
    }
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
/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards () {
  console.log(recipes);
  for (let i = 0; i < recipes.length; i++) {
    const recipeCard = document.createElement('plan-recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    if(recipes[i].days[today.getDay()]){
      const todayCard = document.createElement('plan-recipe-card')
      todayCard.data = recipes[i]
      document.querySelector('#today-recipes').appendChild(todayCard)
    }

    if(recipes[i].days[tomorrow.getDay()]){
      const tomorrowCard = document.createElement('plan-recipe-card')
      tomorrowCard.data = recipes[i]
      document.querySelector('#tomorrow-recipes').appendChild(recipeCard)
    }
    
  }
}

function fullDay(d){
  if (d == 0){
    return "Sunday"
  }
  else if(d == 1){
    return "Monday"
  }
  else if(d == 2){
    return "Tuesday"
  }
  else if(d == 3){
    return "Wednesday"
  }
  else if(d == 4){
    return "Thursday"
  }
  else if(d == 5){
    return "Friday"
  }
  else if(d == 6){
    return "Saturday"
  }
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
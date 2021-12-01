// // RecipeCard.js

class RecipeCard extends HTMLElement {
  constructor () {
    super() // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' })
  }

  set data (data) {
    if (!data) return

    // Used to access the actual data object
    this.json = data

    const style = document.createElement('style')
    const card = document.createElement('article')
    style.innerHTML = `
        * {
          font-family: sans-serif;
          margin: 5;
          padding: 5;
        }

        article {
          align-items: center;
          border: 1px solid rgb(223, 225, 229);
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: repeat(2, 1fr);

          height: 160px;
          width: 400px;
          background-color: LemonChiffon;
          transition: all 0.2s ease;
          user-select: none;
        }

        article:hover {
          border-radius: 8px;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
          transition: all 0.2s ease;
          transform: scale(1.02);
        }

        article > img {
          height: 160px;
          object-fit: cover;
          width: 200px;
          grid-row: 1/ span 3;
          grid-column: 1;
          
        }

        p.title {
          grid-row: 1;
          grid-column: 2;
          
        }
        p:not(.title), span, time {
          color: #70757A;
          font-size: 12px;
          grid-row: 2;
          grid-column: 2;

        }

        button{
          
          grid-column: 2;
        }
      `

    // Grab the title
    const titleText = getTitle(data)
    const title = document.createElement('p')
    title.classList.add('title')
    title.innerText = titleText

    // Grab the thumbnail
    const imageUrl = getImage(data)
    const image = document.createElement('img')
    image.setAttribute('src', imageUrl)
    image.setAttribute('alt', titleText)

    // TODO: Grab the calories

    // Button to edit recipe
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit recipe'
    editButton.addEventListener('click', (e) => {
      e.stopPropagation()
      window.location.href = 'templateEditRecipe.html' // how to pass in the ID of the recipe?
      localStorage.setItem('currentRecipeData', JSON.stringify(data))
      // TODO: fetch the data that's already on the database, place it in the template textareas

      console.log('edit recipe clicked')
    })

    // Button to delete recipe
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete recipe'

    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation()
      firebase.firestore().collection('private_recipe').doc(data.id.toString()).delete().then(function () {
        window.location.href = 'my-recipes.html'
      })
    })

    // Add all of the elements to the card
    card.appendChild(image)
    card.appendChild(title)
    card.appendChild(editButton)
    card.appendChild(deleteButton)
    this.shadowRoot.append(style, card)
  }

  get data () {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json
  }
}

/**
   * Recursively search for a key nested somewhere inside an object
   * @param {Object} object the object with which you'd like to search
   * @param {String} key the key that you are looking for in the object
   * @returns {*} the value of the found key
   */
function searchForKey (object, key) {
  let value
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k]
      return true
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key)
      return value !== undefined
    }
  })
  return value
}

/**
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe title
   */
function getTitle (data) {
  if (data.name) return data.name
  return null
}

/**
   * Extract a usable image from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the URL of the image as a string, otherwise null
   */
function getImage (data) {
  if (data.image_url) return data.image_url
  return null
}

/**
   * Takes in a list of ingredients raw from imported data and returns a neatly
   * formatted comma separated list.
   * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
   *                              imported data
   * @return {String} the string comma separate list of ingredients from the array
   */
function createIngredientList (ingredientArr) {
  let finalIngredientList = ''

  /**
     * Removes the quantity and measurement from an ingredient string.
     * This isn't perfect, it makes the assumption that there will always be a quantity
     * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
     * For the purposes of this lab you don't have to worry about those cases.
     * @param {String} ingredient the raw ingredient string you'd like to process
     * @return {String} the ingredient without the measurement & quantity
     * (e.g. '1 cup flour' returns 'flour')
     */
  function _removeQtyAndMeasurement (ingredient) {
    return ingredient.split(' ').splice(2).join(' ')
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient)
    finalIngredientList += `${ingredient}, `
  })

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2)
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard)

/**
 * @module public_recipe
 */

/**
 * Initializes the recipe JSON object
 * @param {*} name the name of the recipe
 * @param {*} recipe_category the categories of the recipe
 * @param {*} description the description of the recipe
 * @param {*} calories the calories of the recipe
 * @param {*} image_url the url to the image of the food
 * @param {*} recipe_url the url to the official recipe page
 * @param {*} recipe_ingredient the ingredients of the recipe
 */
function public_recipe (name, recipe_category, description, calories, image_url, recipe_url, recipe_ingredient) {
  this.name = name
  this.recipe_category = recipe_category
  this.description = description
  this.calories = calories
  this.image_url = image_url
  this.recipe_url = recipe_url
  this.recipe_ingredient = recipe_ingredient
}

const p_recipe1 = new public_recipe('bakery-style-pizza', ['Main Dishes', 'Pizza'], 'Now found exclusively at one well-known pizza garden in Gravesend, Brooklyn, this style of pizza was once found in neighborhood bakeries. This pizza is deceivingly light, crisp, and slightly spicy. Enjoy with a can of soda.', 270.6, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3474658.jpg', 'https://www.allrecipes.com/recipe/246553/bakery-style-pizza/', ['1 ¼ cups warm water',
  '1 teaspoon active dry yeast',
  '3 cups bread flour',
  '1 ½ teaspoons fine salt',
  '¼ cup olive oil, divided',
  '1 (28 ounce) can plain crushed tomatoes',
  '1 (14 ounce) can pizza sauce (such as Don Peppino®)',
  '8 ounces low-moisture whole-milk mozzarella, very thinly sliced',
  '¼ cup grated Pecorino Romano cheese'])

const p_recipe2 = new public_recipe(2, 'boiled-chicken', ['Meat and Poultry', 'Chicken', 'Whole Chicken Recipes'], 'A recipe for boiled chicken; boiled chicken meat is called for in many other recipes, and is a wonderful basic recipe to have for many uses.', 186, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1046916.jpg', 'https://www.allrecipes.com/recipe/20455/boiled-chicken/', [
  '1 (3 pound) whole chicken',
  '1 large onion, halved - unpeeled',
  '3 carrots, cut into chunks - unpeeled',
  '2 stalks celery, cut into chunks',
  '1 tablespoon whole peppercorns',
  'water to cover'
])

const p_recipe3 = new public_recipe(3, 'Spicy Orange Chicken Wing Sauce', ['Side Dish', 'Sauces and Condiments', 'Sauces', 'Wing Sauce Recipes'], 'Easy and delicious, this spicy orange chicken wing sauce will give you an alternative to going out for your favorite spicy orange chicken dish.', 78.6, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F11%2F04%2Fimage-634.jpg', 'https://www.allrecipes.com/recipe/219110/spicy-orange-chicken-wing-sauce/',
  ['1 cup orange marmalade',
    '⅓ cup rice vinegar',
    '¼ cup hoisin sauce',
    '1 tablespoon soy sauce',
    '2 tablespoons Asian chile pepper sauce'])

const p_recipe4 = new public_recipe(4, 'Fancy Ramen', ['Soups, Stews and Chili Recipes', 'Soup Recipes', 'Noodle Soup Recipes'], 'Ramen noodles with veggies.', 218, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6997058.jpg', 'https://www.allrecipes.com/recipe/268992/fancy-ramen/', [
  '4 cups water',
  '8 ounces sliced fresh mushrooms',
  '1 bunch green onions, thinly sliced, divided',
  '1 large carrot, sliced',
  '½ yellow onion, sliced',
  '2 tablespoons soy sauce',
  '2 tablespoons minced garlic',
  '1 tablespoon sriracha sauce',
  '1 teaspoon sesame oil',
  '1 teaspoon rice wine vinegar',
  '½ teaspoon ground white pepper',
  '½ teaspoon cracked black pepper',
  '2 (3 ounce) packages chicken-flavored ramen noodles'
])

const db = firebase.firestore()

/**
 * Gets a specific public recipe
 * @param {String} id the id of the public recipe
 * @returns the data of the request public recipe
 */
async function get_public_recipe (id) {
  const res = db.collection('public_recipe').doc(id)
  const doc = await res.get()
  if (!doc.exists) {
    console.log('No such document!')
  } else {
    console.log('hi')
    return doc.data()
  }
}

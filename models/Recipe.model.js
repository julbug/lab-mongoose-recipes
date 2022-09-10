const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let today = year + "-" + month + "-" + day; 

let json = require("../data.json");
// let data = JSON.parse(json)


//Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: String, 
  level: {
    type: String,
    default: 'Easy Peasy',
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [ String ],
  cuisine: String,
  dishType: {
    type: String,
    default: 'Breakfast',
    enum: ['Breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: Number,
  creator: String, 
}, {
  timestamps: true 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

//Iteration 3 - Insert multiple recipes
Recipe.create(json).then(newRecipe => {
      console.log('Will you be the next Iron Chef?: ', newRecipe);
  }).then(() => {
      mongoose.disconnect();
  }).catch(err => {
      mongoose.disconnect();
      throw err;
  });

//Iteration 4 - Update recipe  
Recipe.findByIdAndUpdate("631bd8fc13b560d2f9186b9b", {duration: 100}).then(updatedRecipeFromDb => {
    console.log('You have successfully updated the recipe!');
    mongoose.disconnect();
}).catch(err => {
    mongoose.disconnect();
    throw err;
})

//Iteration 5 - Remove a recipe
Recipe.findByIdAndRemove("631bd8fc13b560d2f9186b9a").then(() => {
    console.log('You have deleted a recipe!');
    mongoose.disconnect();
}).catch(err => {
    mongoose.disconnect();
    throw err;
});

module.exports = Recipe;

$(function() {
	var AddMealView = Backbone.View.extend({
		el: $('#main'), 
		template: _.template($('#add-meal-template').html()),
		dietaryRestrictions: {
			veggie: false,
			vegan: false,
			gf: false
		},

		events: {
			'submit .js-add-meal-form': 'addMeal',
			'click .js-meal-dietary-restrictions .js-veggie-toggle': 'toggleVeggie',
			'click .js-meal-dietary-restrictions .js-vegan-toggle': 'toggleVegan',
			'click .js-meal-dietary-restrictions .js-gf-toggle': 'toggleGF'
		},

		initialize: function() {
			// Make sure we don't overwrite anything because we don't know the length
			Turnip.Meals.fetch();
		},

		render: function() {
			this.$el.html(this.template());
			return this.$el;
		},

		addMeal: function(e) {
			var mealData = {
				id: Turnip.Meals.length + 1,
				restrictions: this.dietaryRestrictions
			};

			var $fields = this.$el.find('.c-field');

			e.preventDefault();

			$fields.each(function(index, field) {
				var key = field.name;
				mealData[key] = $(field).val();
			});

			// Just use an excerpt of the about for the description for now
			mealData.desc = mealData.about.substring(0, 150) + '...';

			Turnip.Meals.create(mealData);
			Turnip.Router.navigate('meals', {trigger: true});
		},

		toggleVeggie: function() {
      		this.dietaryRestrictions.veggie = !this.dietaryRestrictions.veggie;
      		this.setVeggieIcon();
      	},

      	setVeggieIcon: function() {
      		if (this.dietaryRestrictions.veggie) {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-active.png');
      		} else {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-inactive.png');
      		}
      	},

      	toggleVegan: function() {
      		this.dietaryRestrictions.vegan = !this.dietaryRestrictions.vegan;
      		this.setVeganIcon();
      	},

      	setVeganIcon: function() {
      		if (this.dietaryRestrictions.vegan) {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-active.png');
      		} else {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-inactive.png');
      		}
      	},

      	toggleGF: function() {
      		this.dietaryRestrictions.gf = !this.dietaryRestrictions.gf;
      		this.setGFIcon();
      	},

      	setGFIcon: function() {
      		if (this.dietaryRestrictions.gf) {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-active.png');
      		} else {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-inactive.png');
      		}
      	}
	});

	var AddRecipeView = Backbone.View.extend({
		el: $('#main'), 
		template: _.template($('#add-recipe-template').html()),
		dietaryRestrictions: {
			veggie: false,
			vegan: false,
			gf: false
		},
		mealId: -1,

		events: {
			'submit .js-add-recipe-form': 'addRecipe',
			'click .js-recipe-dietary-restrictions .js-veggie-toggle': 'toggleVeggie',
			'click .js-recipe-dietary-restrictions .js-vegan-toggle': 'toggleVegan',
			'click .js-recipe-dietary-restrictions .js-gf-toggle': 'toggleGF',
			'click .js-add-ingredient': 'addIngredient',
			'click .js-add-instruction': 'addInstruction'
		},

		render: function(mealId) {
			this.mealId = mealId;
			this.$el.html(this.template());
			return this.$el;
		},

		addRecipe: function(e) {
			var meal = Turnip.Meals.get(this.mealId);
			var recipeData = {
				id: meal.get('recipes').length + 1,
				mealId: this.mealId,
				restrictions: this.dietaryRestrictions,
				excerpt: '',
				ingredients: [],
				instructions: []
			};

			var $fields = this.$el.find('[name=title], [name=prepTime], [name=cookTime]');

			e.preventDefault();

			$fields.each(function(index, field) {
				var key = field.name;
				recipeData[key] = $(field).val();
			});

			this.getIngredients(recipeData);
			this.getInstructions(recipeData);

			var recipe = new Turnip.Recipe(recipeData);
			var mealRecipes = meal.get('recipes');

			mealRecipes.push(recipe);

			meal.save({
				recipes: mealRecipes
			});

			// Add to this user's saved recipes
			var saved = Turnip.User.get('savedRecipes');

      		if (!saved) {
      			saved = [];
      		}

			saved.push(recipe);
      		Turnip.User.set('savedRecipes', saved);
      		Turnip.User.save();

			window.history.back();
		},

		addIngredient: function() {
			var count = this.$el.find('.c-ingredient').length + 1;
			this.$el.find('.c-ingredients').append('<input type="text" class="c-field c-ingredient" placeholder="Ingredient ' + count + ', Amount" name="ing' + count + '">');
		},

		addInstruction: function() {
			var count = this.$el.find('.c-instruction').length + 1;
			this.$el.find('.c-instructions').append('<input type="text" class="c-field c-instruction" placeholder="Instruction ' + count + '" name="inst' + count + '">');
		},

		getIngredients: function(recipeData) {
			var $ingredients = this.$el.find('.c-ingredient');

			var $filteredIngredients = $ingredients.filter(function(index, ingredient) {
				return $(ingredient).val().length > 0;
			});

			$filteredIngredients.each(function(index, ingredient) {
				var val = $(ingredient).val();

				recipeData.ingredients.push({
					eng: val,
					ital: 'Italian translation here'
				});
				recipeData.excerpt += val.toUpperCase();

				if (index < $filteredIngredients.length - 1) {
					recipeData.excerpt += ', ';
				}
			});

			if (recipeData.excerpt.length > 30) {
				recipeData.excerpt = recipeData.excerpt.substring(0, 30) + '...';
			}
		},

		getInstructions: function(recipeData) {
			var $instructions = this.$el.find('.c-instruction');
			var $filteredInstructions = $instructions.filter(function(index, instruction) {
				return $(instruction).val().length > 0;
			});

			$filteredInstructions.each(function(index, instruction) {
				recipeData.instructions.push($(instruction).val());
			});
		},

		toggleVeggie: function() {
      		this.dietaryRestrictions.veggie = !this.dietaryRestrictions.veggie;
      		this.setVeggieIcon();
      	},

      	setVeggieIcon: function() {
      		if (this.dietaryRestrictions.veggie) {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-active.png');
      		} else {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-inactive.png');
      		}
      	},

      	toggleVegan: function() {
      		this.dietaryRestrictions.vegan = !this.dietaryRestrictions.vegan;
      		this.setVeganIcon();
      	},

      	setVeganIcon: function() {
      		if (this.dietaryRestrictions.vegan) {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-active.png');
      		} else {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-inactive.png');
      		}
      	},

      	toggleGF: function() {
      		this.dietaryRestrictions.gf = !this.dietaryRestrictions.gf;
      		this.setGFIcon();
      	},

      	setGFIcon: function() {
      		if (this.dietaryRestrictions.gf) {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-active.png');
      		} else {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-inactive.png');
      		}
      	}
	});

	var AddRestaurantView = Backbone.View.extend({
		el: $('#main'), 
		template: _.template($('#add-restaurant-template').html()),

		dietaryRestrictions: {
			veggie: false,
			vegan: false,
			gf: false
		},

		events: {
			'submit .js-add-restaurant-form': 'addRestaurant',
		},

		render: function(mealId) {
			this.$el.html(this.template());
			return this.$el;
		},

		addRestaurant: function(e) {
			var restaurantData = {
				id: Turnip.Restaurants.length + 1,
				restrictions: this.dietaryRestrictions,
				rating: 3,
				location: [200, 150],
				site: '',
				phone: '',
				hours: 'Closed now. Open at 7:00AM',
				availableMeals: []
			};

			var $fields = this.$el.find('.c-field');

			e.preventDefault();

			$fields.each(function(index, field) {
				var key = field.name;
				restaurantData[key] = $(field).val();
			});

			Turnip.Restaurants.create(restaurantData);
			Turnip.Router.navigate('map', {trigger: true});
		}
	});

	Turnip.AddMealView = new AddMealView;
	Turnip.AddRecipeView = new AddRecipeView;
	Turnip.AddRestaurantView = new AddRestaurantView;
});
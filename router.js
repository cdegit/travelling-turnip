$(function() {
	var TurnipRouter = Backbone.Router.extend({
		routes: {
			'meals': 'defaultRoute',
			'meal/:id': 'mealAbout',
			'meal/:id/recipes': 'mealRecipes',
			'meal/:id/recipes/:rid': 'recipeDetail',

			'add': 'add',
			'addMeal': 'addMeal',
			'addRestaurant': 'addRestaurant',
			'add/meal/:id/recipe': 'addRecipe',

			'map': 'map',
			'restaurants/:id': 'restaurantDetail',

			'phrases': 'phrases',
			'phrases/new': 'createPhrase',

			'saved': 'savedMeals',
			'saved/meals': 'savedMeals',
			'saved/restaurants': 'savedRestaurants',
			'saved/recipes': 'savedRecipes',

			'account': 'account',
			'account/create': 'createAccount',
			'settings': 'settings',
			'location': 'location',

			'onboarding': 'onboarding',
			'welcome': 'welcome',
			'clear': 'clearStorage',

			'*actions': 'defaultRoute'
		}
	});

	var router = new TurnipRouter;

	router.on('route:mealAbout', function(id) {
		// render the detail view for that meal
		if (Turnip.Meals.get(id)) {
			var view = new Turnip.MealView({model: Turnip.Meals.get(id)});
 			$("#main").html(view.render(true).el);

 			Turnip.HeaderView.showTransparentHeader();
 			Turnip.FooterView.setIcon('meals');
 		} else {
 			router.navigate('meals', {trigger: true});
 		}
	});

	router.on('route:mealRecipes', function(id) {
		// a meal has recipes that will be displayed here
		var meal = Turnip.Meals.get(id);

		if (meal) {
			var recipes = meal.get('recipes');

			$('#main').empty();

			if (recipes) {
				recipes.forEach(function(recipe) {
					var model = new Turnip.Recipe(recipe)
					var view = new Turnip.RecipeView({model: model});
	 				$("#main").append(view.render().el);
	 			});
			}

			// TODO: Do this in a less bad way
			$("#main").append('<div class="u-full-padding"><a href="#add/meal/' + meal.get('id') + '/recipe"><img src="img/button_add-recipe.png"></a></div>');

 			Turnip.HeaderView.showBackHeader({title: meal.get('title') + ' Recipes'});
 			Turnip.FooterView.setIcon('meals');
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	router.on('route:recipeDetail', function(mealId, recipeId) {
		var meal = Turnip.Meals.get(mealId);

		if (meal) {
			var recipe = meal.get('recipes').filter(function(recipe) {
				return recipe.id == recipeId;
			})[0];

			var model = new Turnip.Recipe(recipe);
			var view = new Turnip.RecipeView({model: model});

			$("#main").html(view.render(true).el);

			Turnip.HeaderView.showBackHeader({title: model.get('title')});
			Turnip.FooterView.setIcon('meals');
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	router.on('route:add', function() {
		$('.c-overlay').addClass('c--active');
		$('.c-sheet').addClass('c--active');
	});

	$('.c-overlay').on('click', function() {
		window.history.back();
	});

	router.on('route', function(route) {
		if (route !== 'add') {
			$('.c-overlay').removeClass('c--active');
			$('.c-sheet').removeClass('c--active');
		}
	});

	router.on('route:addMeal', function() {
		Turnip.AddMealView.render();
		Turnip.HeaderView.showCloseHeader({title: 'Add Meal', shouldClose: true});
	});

	router.on('route:addRecipe', function(id) {
		Turnip.AddRecipeView.render(id);
		Turnip.HeaderView.showCloseHeader({title: 'Add Recipe'});
	});

	router.on('route:addRestaurant', function() {
		Turnip.Restaurants.fetch();

		if (!Turnip.Restaurants.length) {
	    	defaultData.restaurants.forEach(function(restaurant) {
				Turnip.Restaurants.create(restaurant);
	    	});
	    }
		
		Turnip.AddRestaurantView.render();
		Turnip.HeaderView.showCloseHeader({title: 'Add Restaurant', shouldClose: true});
	});

	router.on('route:defaultRoute', function(id) {
		if (!localStorage.getItem('onboarded')) {
			router.navigate('onboarding', {trigger: true});
			return;
		}

		// Render the meals page
		var $main = $("#main");
		var initialMealsLength = Turnip.Meals.length;

		$main.empty();

		if (!Turnip.Meals.length) {
	    	defaultData.meals.forEach(function(meal) {
				Turnip.Meals.create(meal);
	    	});
	    } else {
	    	Turnip.MealsView.addAll();
	    }

	    Turnip.HeaderView.showLocationHeader();
	    Turnip.FooterView.setIcon('meals');

	    $('.c-onboarding').empty();
	    $('.c-welcome').empty();
	});

	router.on('route:map', function() {
		Turnip.MapView.render();

		Turnip.Restaurants.fetch();

		if (!Turnip.Restaurants.length) {
	    	defaultData.restaurants.forEach(function(restaurant) {
				Turnip.Restaurants.create(restaurant);
	    	});
	    }

		Turnip.renderRestaurantMarkers(Turnip.Restaurants);

		Turnip.HeaderView.showLocationHeader();
		Turnip.FooterView.setIcon('restaurants');
	});

	router.on('route:restaurantDetail', function(id) {
		var resto = Turnip.Restaurants.get(id);

		if (resto) {
			var view = new Turnip.RestaurantView({model: resto});
 			$("#main").html(view.render(true).el);

 			Turnip.HeaderView.showTransparentHeader();
 			Turnip.FooterView.setIcon('restaurants');
 		} else {
 			router.navigate('map', {trigger: true});
 		}
	});

	router.on('route:savedMeals', function() {
		var savedMeals = Turnip.Meals.saved();

		$('#main').empty();

		if (savedMeals.length) {
			savedMeals.forEach(function(meal) {
				Turnip.MealsView.addAllSaved();
			});
		} else {
			$('#main').append('<div class="u-full-padding t-body">You don\'t have any meals saved. Why not go to the meals page and add your favourites?</div>');
		}
		Turnip.HeaderView.showSavedHeader('meals');
		Turnip.FooterView.setIcon('my-food');
	});

	router.on('route:savedRestaurants', function() {
		Turnip.Restaurants.fetch();
		var savedRestaurants = Turnip.Restaurants.saved();

		$('#main').empty();

		if (savedRestaurants.length) {
			savedRestaurants.forEach(function(restaurant) {
				var view = new Turnip.RestaurantView({model: restaurant});
 				$("#main").append(view.renderCard());
			});
		} else {
			$('#main').append('<div class="u-full-padding t-body">You don\'t have any restaurants saved. Why not go to the map and add your favourites?</div>');
		}

		Turnip.HeaderView.showSavedHeader('restaurants');
		Turnip.FooterView.setIcon('my-food');
	});

	router.on('route:savedRecipes', function() {
		var savedRecipes = Turnip.User.get('savedRecipes');

		$('#main').empty();

		if (savedRecipes && savedRecipes.length) {
			savedRecipes.forEach(function(recipe) {
				var model = new Turnip.Recipe(recipe);
				var view = new Turnip.RecipeView({model: model});
 				$("#main").append(view.renderCard());
			});
		} else {
			$('#main').append('<div class="u-full-padding t-body">You don\'t have any recipes saved. Why not go to the meals page and add your favourites?</div>');
		}

		Turnip.HeaderView.showSavedHeader('recipes');
		Turnip.FooterView.setIcon('my-food');
	});

	router.on('route:phrases', function() {
		var $main = $('#main');
		$main.empty();

		Turnip.PhrasesView.render();
		Turnip.FooterView.setIcon('phrasebook');
		Turnip.HeaderView.showPhrasesHeader();

		scrollTo(0, 0);
	});

	router.on('route:createPhrase', function() {
		var $main = $('#main');
		$main.empty();

		Turnip.PhrasesView.renderNewPage();

		Turnip.FooterView.setIcon('phrasebook');
		Turnip.HeaderView.showPhrasesCreateHeader();
	});

	router.on('route:account', function() {
		Turnip.AccountView.render();
		Turnip.HeaderView.showBackHeader({title: 'Account'});
	});

	router.on('route:createAccount', function() {
		$('.c-welcome').empty();
		Turnip.AccountView.renderCreatePage();
		Turnip.HeaderView.showCloseHeader({title: 'Create Account'});
	});

	router.on('route:settings', function() {
		Turnip.SettingsView.render();
		Turnip.HeaderView.showBackHeader({title: 'Settings'});
	});

	router.on('route:location', function() {
		Turnip.LocationView.render();
		Turnip.HeaderView.showCloseHeader({title: 'Location'});
	});

	router.on('route:onboarding', function() {
		// Show the onboarding thing
		Turnip.OnboardingView.render();

		$('.m-scooch').scooch();

		$('.m-scooch').on('beforeSlide', function(e, previousSlide, nextSlide) {
			// Take to the log in page
			if (previousSlide == 4 && nextSlide == 4) {
				router.navigate('welcome', {trigger: true});
			}
		});
	});

	router.on('route:welcome', function() {
		Turnip.WelcomeView.render();
		$('.c-onboarding').empty();

		localStorage.setItem('onboarded', true);
	});

	router.on('route:clearStorage', function() {
		localStorage.clear();
		location.href = location.href.split('#')[0];
	});

	Backbone.history.start();

	Turnip.Router = router;
});
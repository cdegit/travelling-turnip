$(function() {
	var TurnipRouter = Backbone.Router.extend({
		routes: {
			'meals': 'defaultRoute',
			'meal/:id': 'mealAbout',
			'meal/:id/recipes': 'mealRecipes',
			'meal/:id/recipes/:rid': 'recipeDetail',

			'phrases': 'phrases',
			'phrases/new': 'createPhrase',

			'saved': 'savedMeals',
			'saved/meals': 'savedMeals',
			'saved/restaurants': 'savedRestaurants',
			'saved/recipes': 'savedRecipes',

			'account': 'account',
			'settings': 'settings',

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
 		} else {
 			router.navigate('meals', {trigger: true});
 		}
	});

	router.on('route:mealRecipes', function(id) {
		// a meal has recipes that will be displayed here
		var meal = Turnip.Meals.get(id);

		if (meal) {
			$('#main').empty();

			meal.get('recipes').forEach(function(recipe) {
				var model = new Turnip.Recipe(recipe)
				var view = new Turnip.RecipeView({model: model});
 				$("#main").append(view.render().el);
 			});

 			Turnip.HeaderView.showBackHeader({title: meal.get('title') + ' Recipes'});
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
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	router.on('route:defaultRoute', function(id) {
		if (!localStorage.getItem('onboarded')) {
			router.navigate('onboarding', {trigger: true});
			return;
		}

		// Render the meals page
		var $main = $("#main");
		var initialMealsLength = Turnip.Meals.length;

		Turnip.Meals.fetch();

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

	router.on('route:savedMeals', function() {
		var savedMeals = Turnip.Meals.saved();

		$('#main').empty();

		if (savedMeals.length) {
			savedMeals.forEach(function(meal) {
				Turnip.MealsView.addAllSaved();
			});
			Turnip.HeaderView.showSavedHeader();
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	router.on('route:savedRecipes', function() {
		var savedRecipes = Turnip.User.get('savedRecipes');

		$('#main').empty();

		if (savedRecipes.length) {
			savedRecipes.forEach(function(recipe) {
				var model = new Turnip.Recipe(recipe);
				var view = new Turnip.RecipeView({model: model});
 				$("#main").append(view.render().el);
			});
		}
	});

	router.on('route:phrases', function() {
		var $main = $('#main');
		$main.empty();

		Turnip.PhrasesView.render();
		Turnip.FooterView.setIcon('phrasebook');
		Turnip.HeaderView.showPhrasesHeader();
	});

	router.on('route:createPhrase', function() {
		var $main = $('#main');
		$main.empty();

		Turnip.PhrasesView.renderNewPage();

		Turnip.FooterView.setIcon('phrasebook');
		Turnip.HeaderView.showPhrasesCreateHeader();
	});

	router.on('route:account', function() {
		if (Turnip.User.get('loggedIn')) {
			Turnip.ModalView.openModal('accountLoggedInTemplate');
		} else {
			Turnip.ModalView.openModal('accountLoggedOutTemplate');
		}
	});

	router.on('route:settings', function() {
		Turnip.SettingsView.render();
		Turnip.HeaderView.showBackHeader({title: 'Settings'});
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
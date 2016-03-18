$(function() {
	var TurnipRouter = Backbone.Router.extend({
		routes: {
			'meals': 'defaultRoute',
			'meal/:id': 'mealAbout',
			'meal/:id/recipes': 'mealRecipes',

			'saved': 'savedMeals',

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

	router.on('route:defaultRoute', function(id) {
		// Render the meals page
		var $main = $("#main");
		var initialMealsLength = Turnip.Meals.length;

		Turnip.Meals.fetch();

		if (!Turnip.Meals.length) {
	    	defaultData.meals.forEach(function(meal) {
				Turnip.Meals.create(meal);
	    	});
	    } else if (initialMealsLength) {
	    	// Empty and rerender if we didn't just fetch
	    	$main.empty();
	    	Turnip.MealsView.addAll();
	    }

	    Turnip.HeaderView.showLocationHeader();
	});

	router.on('route:savedMeals', function() {
		var savedMeals = Turnip.Meals.saved();

		$('#main').empty();

		if (savedMeals.length) {
			savedMeals.forEach(function(meal) {
				Turnip.MealsView.addAllSaved();
			});
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	Backbone.history.start();

	Turnip.Router = router;
});
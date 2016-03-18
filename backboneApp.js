$(function(){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'meals': 'defaultRoute',
			'meal/:id': 'mealAbout',
			'meal/:id/recipes': 'mealRecipes',

			'saved': 'savedMeals',

			'*actions': 'defaultRoute'
		}
	});

	var Meal = Backbone.Model.extend({
		toggle: function() {
			this.save({saved: !this.get("saved")});
		}
	});

	var Recipe = Backbone.Model.extend({});

	var MealList = Backbone.Collection.extend({
		model: Meal,
		localStorage: new Backbone.LocalStorage("meals-backbone"),
		saved: function() {
			return this.where({saved: true});
		}
	});

	var Meals = new MealList;

	var MealView = Backbone.View.extend({
		tagName: 'div',
		className: 'c-meal',
		template: _.template($('#meal-template').html()),
		detailTemplate: _.template($('#meal-detail-template').html()),

		events: {
			'click .js-toggle-saved' : 'toggleSaved'
		},

		render: function(detail) {
			if (detail) {
				this.$el.html(this.detailTemplate(this.model.toJSON()));
			} else {
				this.$el.html(this.template(this.model.toJSON()));
			}
      		
      		return this;
      	},

      	toggleSaved: function() {
      		this.model.toggle();
      	}
	});

	var RecipeView = Backbone.View.extend({
		tagName: 'div',
		className: 'c-recipe',
		template: _.template($('#recipe-template').html()),
		detailTemplate: _.template($('#recipe-detail-template').html()),

		render: function(detail) {
			if (detail) {
				this.$el.html(this.detailTemplate(this.model.toJSON()));
			} else {
				this.$el.html(this.template(this.model.toJSON()));
			}
      		
      		return this;
      	}
	});

	var MealsContainerView = Backbone.View.extend({
	    el: $("#todoapp"),
	    initialize: function() {
	    	this.listenTo(Meals, 'add', this.addOne);
	    },

	    addAll: function() {
	    	this.clear();
	    	Meals.forEach(this.addOne);
	    },

	    addAllSaved: function() {
	    	this.clear();
	    	Meals.saved().forEach(this.addOne);
	    },

	    addOne: function(meal) {
	    	var $container = $('.c-meal-list');
	    	var view = new MealView({model: meal});

	    	if (!$container.length) {
	    		$container = $('<div class="c-meal-list">');
	    		this.$('#main').append($container);
	    	}

     		$container.append(view.render().el);
	    },

	    clear: function() {
	    	$('.c-meal-list').empty();
	    }
	});
	
	var App = new MealsContainerView;

	var router = new AppRouter;

	router.on('route:mealAbout', function(id) {
		// render the detail view for that meal
		if (Meals.get(id)) {
			var view = new MealView({model: Meals.get(id)});
 			$("#main").html(view.render(true).el);
 		} else {
 			router.navigate('meals', {trigger: true});
 		}
	});

	router.on('route:mealRecipes', function(id) {
		// a meal has recipes that will be displayed here
		var meal = Meals.get(id);

		if (meal) {
			$('#main').empty();

			meal.get('recipes').forEach(function(recipe) {
				var model = new Recipe(recipe)
				var view = new RecipeView({model: model});
 				$("#main").append(view.render().el);
 			});
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	router.on('route:defaultRoute', function(id) {
		// Render the meals page
		var $main = $("#main");
		var initialMealsLength = Meals.length;

		Meals.fetch();

		if (!Meals.length) {
	    	defaultData.meals.forEach(function(meal) {
				Meals.create(meal);
	    	});
	    } else if (initialMealsLength) {
	    	// Empty and rerender if we didn't just fetch
	    	$main.empty();
	    	App.addAll();
	    }
	});

	router.on('route:savedMeals', function() {
		var savedMeals = Meals.saved();

		$('#main').empty();

		if (savedMeals.length) {
			savedMeals.forEach(function(meal) {
				App.addAllSaved();
			});
		} else {
			router.navigate('meals', {trigger: true});
		}
	});

	Backbone.history.start();
});
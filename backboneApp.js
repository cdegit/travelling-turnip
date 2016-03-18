$(function(){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'meals': 'defaultRoute',
			'meal/:id': 'mealAbout',
			'meal/:id/recipes': 'mealRecipes',
			'*actions': 'defaultRoute'
		}
	});

	var Meal = Backbone.Model.extend({
		defaults: function() {
			return {
				title: 'Rosemary Foccacia',
				nearby: true,
				recipes: true,
				desc: 'Lorem ipsum',
				saved: false
			}
		},

		toggle: function() {
			this.save({saved: !this.get("saved")});
		}
	});

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

		render: function(detail) {
			if (detail) {
				this.$el.html(this.detailTemplate(this.model.toJSON()));
			} else {
				this.$el.html(this.template(this.model.toJSON()));
			}
      		
      		return this;
      	}
	});

	var AppView = Backbone.View.extend({
	    el: $("#todoapp"),
	    initialize: function() {
	    	this.listenTo(Meals, 'add', this.addOne);
	    },

	    addAll: function() {
	    	Meals.each(this.addOne, this);
	    },

	    addOne: function(meal) {
	    	var view = new MealView({model: meal});
     		this.$("#main").append(view.render().el);
	    }
	});
	
	var App = new AppView;

	var router = new AppRouter;

	router.on('route:mealAbout', function(id) {
		// render the detail view for that meal
		if (Meals.get(id)) {
			var view = new MealView({model: Meals.get(id)});
 			$("#main").html(view.render(true).el);
 		}

	});

	router.on('route:mealRecipes', function(id) {
		// a meal has recipes that will be displayed here
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

	Backbone.history.start();
});
$(function(){
	var turnip = {};

	var User = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('user-backbone'),
		login: function(name) {
			this.save({
				loggedIn: true,
				name: name
			});
		},

		logout: function() {
			this.save({
				loggedIn: false,
				name: '',
				veggie: false,
				vegan: false,
				gf: false,
				// settings ones, maybe group later
				gps: false,
				local: false,
				restos: false,
				faved: false
			});
		},

		toggleVeggie: function() {
			this.save({
				veggie: !this.get('veggie')
			});
		},

		toggleVegan: function() {
			this.save({
				vegan: !this.get('vegan')
			});
		},

		toggleGF: function() {
			this.save({
				gf: !this.get('gf')
			});
		},
	});

	var Meal = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('meals-backbone'),
		toggle: function() {
			this.save({saved: !this.get("saved")});

			Turnip.FooterView.flashSavedIcon();
		}
	});

	var Recipe = Backbone.Model.extend({});

	var MealList = Backbone.Collection.extend({
		model: Meal,
		localStorage: new Backbone.LocalStorage('meals-backbone'),
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
		ingredientsTemplate: _.template($('#meal-ingredients-template').html()),

		events: {
			'click .js-toggle-saved' : 'toggleSaved',
			'click .js-show-restaurants': 'showRestaurants'
		},

		render: function(detail) {
			if (detail) {
				this.$el.html(this.detailTemplate(this.model.toJSON()));
			} else {
				this.$el.html(this.template(this.model.toJSON()));
			}

			this.setSavedIcon();
      		
      		return this;
      	},

      	toggleSaved: function() {
      		this.model.toggle();

      		this.setSavedIcon();
      	},

      	setSavedIcon: function() {
      		if (this.model.get('saved')) {
      			this.$el.find('.c-heart').attr('src', 'img/icon_full-heart.png');
      		} else {
      			this.$el.find('.c-heart').attr('src', 'img/icon_empty-heart.png');
      		}
      	},

      	showRestaurants: function() {
      		// Automate searching for this meal on the map
      		turnip.Router.navigate('map', {trigger: true});
      		turnip.HeaderView.showSearch();
      		$('.js-search-field').val(this.model.get('title'));
      		turnip.HeaderView.applySearch();
      	},

      	renderIngredients: function() {
      		this.$el.html(this.ingredientsTemplate(this.model.toJSON()));
      		this.setSavedIcon();
      		return this;
      	}
	});

	var RecipeView = Backbone.View.extend({
		tagName: 'div',
		className: 'c-recipe',
		template: _.template($('#recipe-template').html()),
		detailTemplate: _.template($('#recipe-detail-template').html()),
		cardTemplate: _.template($('#recipe-card-template').html()),

		events: {
			'click .c-recipe__list-view': 'showDetailView',
			'click .js-toggle-saved': 'toggleSaved'
		},

		render: function(detail) {
			if (detail) {
				this.$el.html(this.detailTemplate(this.model.toJSON()));
			} else {
				this.$el.html(this.template(this.model.toJSON()));
			}

			this.toggleSavedIcon();
      		
      		return this;
      	},

      	renderCard: function() {
      		this.$el.html(this.cardTemplate(this.model.toJSON()));
      		return this.$el;
      	},

      	showDetailView: function() {
      		turnip.Router.navigate('meal/' + this.model.get('mealId') + '/recipes/' + this.model.get('id'), {trigger: true});
      	},

      	isSaved: function() {
      		var that = this;
      		var saved = turnip.User.get('savedRecipes');

      		if (!saved) {
      			saved = [];
      		}

      		// see if this recipe is already in there
      		var entryInSaved = saved.find(function(recipe) {
      			return recipe.id == that.model.get('id') && recipe.mealId == that.model.get('mealId');
      		});

      		return entryInSaved;
      	},

      	toggleSaved: function() {
      		var saved = turnip.User.get('savedRecipes');
      		var entryInSaved = this.isSaved();

      		if (!saved) {
      			saved = [];
      		}

      		if (entryInSaved) {
      			// remove from saved
      			saved.splice(saved.indexOf(entryInSaved), 1);
      		} else {
      			saved.push(this.model);
      		}

      		turnip.User.set('savedRecipes', saved);
      		turnip.User.save();

			Turnip.FooterView.flashSavedIcon();

      		this.toggleSavedIcon();
      	},

      	toggleSavedIcon: function() {
      		if (this.isSaved()) {
      			this.$el.find('.c-icon').attr('src', 'img/icon_full-heart.png');
      		} else {
      			this.$el.find('.c-icon').attr('src', 'img/icon_empty-heart.png');
      		}
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

	    showFilteredMeals: function(filteredMeals) {
	    	this.clear();
	    	filteredMeals.forEach(this.addOne);
	    },

	    clear: function() {
	    	$('.c-meal-list').empty();
	    }
	});

	var OnboardingView = Backbone.View.extend({
		el: $('.c-onboarding'),
		template: _.template($('#onboarding-template').html()),

		render: function() {
			this.$el.html(this.template());
			return this.$el;
		}
	});

	var WelcomeView = Backbone.View.extend({
		el: $('.c-welcome'),
		template: _.template($('#welcome-template').html()),

		events: {
			'submit form': 'login'
		},

		render: function() {
			this.$el.html(this.template());
			return this.$el;
		},

		login: function(e) {
			var username = this.$el.find('input[type=text]').val();
			e.preventDefault();
			turnip.User.login(username);

			turnip.Router.navigate('meals', {trigger: true});
		}
	});

	var FooterView = Backbone.View.extend({
		el: $('footer'),
		events: {
			'click li': 'updateActiveIcon'
		},

		updateActiveIcon: function(e) {
			var $target = $(e.target);
			var $parent = $target.parents('.c-nav-icon');

			if ($parent.length) {
				$('.c-nav-icon').removeClass('c--active');
				$parent.addClass('c--active');
			}
		},

		setIcon: function(name) {
			$('.c-nav-icon').removeClass('c--active');
			this.$el.find('.c--' + name).addClass('c--active');
		},

		flashSavedIcon: function() {
			$('.c-nav-icon.c--my-food').addClass('c--flash');

			setTimeout(function() {
				$('.c-nav-icon.c--my-food').removeClass('c--flash');
			}, 500);
		}
	});
	
	turnip.User = new User({id: 1});

	turnip.OnboardingView = new OnboardingView;
	turnip.WelcomeView = new WelcomeView;
	turnip.FooterView = new FooterView;

	turnip.MealView = MealView;
	turnip.Recipe = Recipe;
	turnip.RecipeView = RecipeView;

	turnip.Meal = Meal;
	turnip.Meals = Meals;
	turnip.MealsView = new MealsContainerView;

	window.Turnip = turnip;
});
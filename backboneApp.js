$(function(){
	var turnip = {};

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
				this.setSavedIcon();
			}
      		
      		return this;
      	},

      	toggleSaved: function() {
      		this.model.toggle();

      		this.setSavedIcon();
      	},

      	setSavedIcon: function() {
      		if (this.model.get('saved')) {
      			this.$el.find('.c-icon').attr('src', 'img/icon_full-heart.png');
      		} else {
      			this.$el.find('.c-icon').attr('src', 'img/icon_empty-heart.png');
      		}
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

	var HeaderView = Backbone.View.extend({
		el: $('header'),
		template: _.template($('#header-location-template').html()),
		backTemplate: _.template($('#header-back-template').html()),
		transparentTemplate: _.template($('#header-transparent-template').html()),
		savedTemplate: _.template($('#header-saved-template').html()),

		events: {
			'click .js-back': 'goBack'
		},

		render: function(templateName, data) {
			var tmp = templateName || 'template';
			var d = data || {};

			this.$el.html(this[tmp](d));

			if (templateName == 'transparentTemplate') {
				this.$el.addClass('c--transparent');
			} else {
				this.$el.removeClass('c--transparent');
			}
		},

		showLocationHeader: function() {
			this.render('template');
		},

		showBackHeader: function(data) {
			this.render('backTemplate', data);
		},

		showTransparentHeader: function() {
			this.render('transparentTemplate');
		},

		showSearch: function() {

		},

		showSavedHeader: function() {
			this.render('savedTemplate');
		},

		goBack: function() {
			window.history.back();
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
		}
	});
	

	turnip.HeaderView = new HeaderView;
	turnip.FooterView = new FooterView;

	turnip.MealView = MealView;
	turnip.Recipe = Recipe;
	turnip.RecipeView = RecipeView;

	turnip.Meals = Meals;
	turnip.MealsView = new MealsContainerView;

	window.Turnip = turnip;
});
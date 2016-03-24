$(function() {
	var HeaderView = Backbone.View.extend({
		el: $('header'),
		template: _.template($('#header-location-template').html()),
		backTemplate: _.template($('#header-back-template').html()),
		closeTemplate: _.template($('#header-close-template').html()),
		transparentTemplate: _.template($('#header-transparent-template').html()),
		savedTemplate: _.template($('#header-saved-template').html()),
		searchTemplate: _.template($('#header-search-template').html()),
		phrasesTemplate: _.template($('#header-phrases-template').html()),
		phrasesCreateTemplate: _.template($('#header-phrases-create-template').html()),

		lastTemplate: '',
		currentTemplate: '',

		dietaryRestrictions: {
			veggie: false,
			vegan: false,
			gf: false
		},

		events: {
			'click .js-back': 'goBack',
			'click .js-close': 'goToHome',
			'click .js-close-search': 'closeSearch',
			'click .c-saved-nav a': 'selectSavedTab',
			'click .js-search': 'showSearch',
			'change .js-search-field': 'applySearch',
			'click .js-filter': 'showFilters',

			'click .js-search-dietary-restrictions .js-veggie-toggle': 'toggleVeggie',
			'click .js-search-dietary-restrictions .js-vegan-toggle': 'toggleVegan',
			'click .js-search-dietary-restrictions .js-gf-toggle': 'toggleGF',
			'change .js-sort': 'sort'
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

			if (templateName == 'searchTemplate' || templateName == 'savedTemplate') {
				$('html').addClass('c--taupe');
			} else {
				$('html').removeClass('c--taupe');
			}

			if (templateName == 'savedTemplate') {
				this.$el.addClass('c--extended');
			} else {
				this.$el.removeClass('c--extended');
			}

			if (templateName == 'searchTemplate') {
				this.$el.addClass('c--extended-plus');
			} else {
				this.$el.removeClass('c--extended-plus');
			}

			this.lastTemplate = this.currentTemplate;
			this.currentTemplate = templateName;
		},

		showLocationHeader: function() {
			this.render('template');
		},

		showBackHeader: function(data) {
			this.render('backTemplate', data);
		},

		showCloseHeader: function(data) {
			if (data.shouldClose == undefined) {
				data.shouldClose = false;
			}
			this.render('closeTemplate', data);
		},

		showTransparentHeader: function() {
			this.render('transparentTemplate');
		},

		showSearch: function() {
			this.render('searchTemplate');
		},

		closeSearch: function() {
			this.currentTemplate = this.lastTemplate;
			this.render(this.lastTemplate);

			// Clear any searches you've applied
			if (window.location.hash === '#meals') {
				Turnip.MealsView.showFilteredMeals(Turnip.Meals);
			}

			if (window.location.hash === '#map') {
				Turnip.renderRestaurantMarkers(Turnip.Restaurants);
			}
		},

		showSavedHeader: function(tab) {
			this.render('savedTemplate');

			if (tab) {
				$('.c-saved-nav .c--active').removeClass('c--active');
				$('.c-saved-nav .js-' + tab).addClass('c--active');
			}
		},

		showPhrasesHeader: function() {
			this.render('phrasesTemplate');
		},

		showPhrasesCreateHeader: function() {
			this.render('phrasesCreateTemplate');
		},

		goBack: function() {
			window.history.back();
		},

		goToHome: function() {
			Turnip.Router.navigate('meals', {trigger: true});
		},

		selectSavedTab: function(e) {
			$('.c-saved-nav .c--active').removeClass('c--active');
			$(e.target).parents('li').addClass('c--active');
		},

		applySearch: function() {
			var q = $('.js-search-field').val();
			var queries = q.split(', ');

			// if a query like key:value, use where to see if it matches exactly?
			// Or do like the includes search
			if (window.location.hash === '#meals') {
				filteredMeals = Turnip.Meals.filter(function(meal) {
					// If it matches any of the queries
					var matchedOne;
					queries.forEach(function(query) {
						if (meal.get('title').toLowerCase().includes(query.toLowerCase())) {
							matchedOne = true;
						}
					});

					return matchedOne;
				});

				// add filter to meals view
				Turnip.MealsView.showFilteredMeals(filteredMeals);
			}

			if (window.location.hash === '#map') {
				filteredRestaurants = Turnip.Restaurants.filter(function(restaurant) {
					var matchedOne;
					queries.forEach(function(query) {
						// Can use meal:NAME to find restaurants that serve that specific meal
						if (query.includes('meal:')) {
							var val = query.split(':')[1].toLowerCase();

							if (restaurant.get('availableMeals').join(' ').toLowerCase().includes(val)) {
								matchedOne = true;
							}
						}

						if (restaurant.get('name').toLowerCase().includes(query.toLowerCase())) {
							matchedOne = true;
						}
					});

					return matchedOne;
				});

				Turnip.renderRestaurantMarkers(filteredRestaurants);
			}
		},

		showFilters: function() {
			$('.c-filter').toggleClass('c--active');
		},

		sort: function() {
			$('.c-select__text').text( $('.js-sort :selected').val() );
		},

		toggleVeggie: function() {
      		this.dietaryRestrictions.veggie = !this.dietaryRestrictions.veggie;
      		this.setVeggieIcon();

      		// TODO: depending on page, apply to search
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

	Turnip.HeaderView = new HeaderView;
});

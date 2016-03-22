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
				name: ''
			});
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

	var Phrase = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('phrases-backbone')
	});

	var PhraseList = Backbone.Collection.extend({
		model: Phrase,
		localStorage: new Backbone.LocalStorage('phrases-backbone')
	});

	var Phrases = new PhraseList;

	var PhrasesContainerView = Backbone.View.extend({
		el: $('#main'),
		template: _.template($('#phrase-list-template').html()),
		newTemplate: _.template($('#phrases-new-template').html()),
		phraseTemplate: _.template($('#phrase-template').html()),
		phraseComponents: [],

		events: {
			'submit form': 'addNewPhrase'
		},

	    initialize: function() {
	    	this.listenTo(Phrases, 'add', this.addOne);
	    	this.selectedPhrases = new PhraseList;
	    },

	    render: function() {
	    	if (!this.selectedPhrases.length) {
				this.selectedPhrases.fetch();
			}

	    	this.$el.html(this.template({}));
	    	
	    	this.addAll();
	    },

	    addOne: function(phrase) {
	    	$('.js-phrases-list').prepend(this.phraseTemplate(phrase.toJSON()));
	    },

	    addAll: function() {
	    	this.selectedPhrases.each(this.addOne, this);
	    },

	    renderNewPage: function() {
	    	this.$el.html(this.newTemplate({
	    		phrases: defaultData.phraseComponents
	    	}));
	    },

	    addNewPhrase: function(e) {
	    	var $checked = this.$el.find(':checked');
	    	var phrases = [];

	    	e.preventDefault();

	    	$checked.each(function(index, phrase) {
	    		phrases.push(defaultData.phraseComponents[$(phrase).attr('phrase-index')]);
	    	});

	    	var phrase = new Phrase({
	    		phrases: phrases,
	    		id: this.selectedPhrases.length
	    	});

	    	this.selectedPhrases.add(phrase);
	    	this.selectedPhrases.sync('create', phrase);

	    	if (turnip.Router) {
	    		turnip.Router.navigate('phrases', {trigger: true});
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

	var HeaderView = Backbone.View.extend({
		el: $('header'),
		template: _.template($('#header-location-template').html()),
		backTemplate: _.template($('#header-back-template').html()),
		transparentTemplate: _.template($('#header-transparent-template').html()),
		savedTemplate: _.template($('#header-saved-template').html()),
		phrasesTemplate: _.template($('#header-phrases-template').html()),
		phrasesCreateTemplate: _.template($('#header-phrases-create-template').html()),

		events: {
			'click .js-back': 'goBack',
			'click .c-saved-nav a': 'selectSavedTab'
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

		showPhrasesHeader: function() {
			this.render('phrasesTemplate');
		},

		showPhrasesCreateHeader: function() {
			this.render('phrasesCreateTemplate');
		},

		goBack: function() {
			window.history.back();
		},

		selectSavedTab: function(e) {
			$('.c-saved-nav .c--active').removeClass('c--active');
			$(e.target).parents('li').addClass('c--active');
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
		}
	});

	var ModalView = Backbone.View.extend({
		el: $('.c-modal-container'),
		accountLoggedOutTemplate: _.template($('#account-logged-out-template').html()),
		accountLoggedInTemplate: _.template($('#account-logged-in-template').html()),

		events: {
			'click .c-overlay': 'closeModal',
			'submit form': 'login',
			'click .js-logout': 'logout'
		},

		initialize: function() {
			turnip.User.fetch();
		},

		render: function(templateName) {
			var tmp = templateName || 'template';
			var data = turnip.User.toJSON();

			var $container = this.$el.find('.c-sheet-container');
			var $sheet = $('<div class="c-sheet c--active">');

			$container.empty();

			$sheet.append(this[tmp](data));
			$container.append($sheet);
		},

		openModal: function(templateName) {
			this.render(templateName);
			this.$el.find('.c-overlay').addClass('c--active');
		},

		closeModal: function() {
			this.$el.find('.c--active').removeClass('c--active');
			window.history.back();
		},

		login: function(e) {
			var username = this.$el.find('input[type=text]').val();
			e.preventDefault();
			turnip.User.login(username);

			this.closeModal();
		},

		logout: function() {
			turnip.User.logout();
			this.closeModal();
		}
	});

	var SettingsView = Backbone.View.extend({
		el: $('#main'),
		template: _.template($('#settings-template').html()),

		events: {
			'change input': 'toggleSetting'
		},

		initialize: function() {
			this.model = turnip.User;
		},

		render: function() {
			this.$el.html(this.template());
			this.initSettings();
			return this.$el;
		},

		toggleSetting: function(e) {
			var $checkbox = $(e.target);
			var key = $checkbox.attr('name');
			var val = $checkbox.prop('checked');

			this.model.set(key, val);
			this.model.save();
		},

		initSettings: function() {
			var that = this;
			var $checkboxes = this.$el.find('[type="checkbox"]');

			$checkboxes.each(function(index, checkbox) {
				var name = checkbox.name;
				$(checkbox).prop('checked', that.model.get(name));
			});
		}
	});
	
	turnip.User = new User({id: 1});

	turnip.OnboardingView = new OnboardingView;
	turnip.WelcomeView = new WelcomeView;
	turnip.HeaderView = new HeaderView;
	turnip.FooterView = new FooterView;
	turnip.ModalView = new ModalView;

	turnip.SettingsView = new SettingsView;

	turnip.MealView = MealView;
	turnip.Recipe = Recipe;
	turnip.RecipeView = RecipeView;

	turnip.Meals = Meals;
	turnip.MealsView = new MealsContainerView;

	turnip.Phrases = Phrases;
	turnip.PhrasesView = new PhrasesContainerView;

	window.Turnip = turnip;
});
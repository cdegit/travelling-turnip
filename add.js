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

	Turnip.AddMealView = new AddMealView;
});
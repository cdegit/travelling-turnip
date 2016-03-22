$(function() {
	var MapView = Backbone.View.extend({
		el: $('#main'), 
		template: _.template($('#map-template').html()),

		render: function() {
			this.$el.html(this.template());
			return this.$el;
		}
	});

	var Restaurant = Backbone.Model.extend({
		toggle: function() {
			this.save({saved: !this.get("saved")});
		}
	});

	var RestaurantList = Backbone.Collection.extend({
		model: Restaurant,
		localStorage: new Backbone.LocalStorage('restaurants-backbone'),
		saved: function() {
			return this.where({saved: true});
		}
	});

	var Restaurants = new RestaurantList;

	var RestaurantView = Backbone.View.extend({
		tagName: 'div',
		className: 'c-restaurant',
		template: _.template($('#restaurant-template').html()),
		//detailTemplate: _.template($('#meal-detail-template').html()),

		events: {
			'click .js-toggle-saved' : 'toggleSaved'
		},

		render: function(detail) {
			// if (detail) {
			// 	this.$el.html(this.detailTemplate(this.model.toJSON()));
			// } else {
				this.$el.html(this.template(this.model.toJSON()));
				this.setSavedIcon();
			// }
      		
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
      	}
	});

	Turnip.Restaurants = Restaurants;
	Turnip.MapView = new MapView;
	Turnip.RestaurantView = RestaurantView;
});
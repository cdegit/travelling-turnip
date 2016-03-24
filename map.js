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

			Turnip.FooterView.flashSavedIcon();
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
		cardTemplate: _.template($('#restaurant-card-template').html()),
		markerTemplate: _.template($('#restaurant-marker-template').html()),

		events: {
			'click .js-toggle-saved' : 'toggleSaved'
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.setSavedIcon();
      		return this;
      	},

      	renderCard: function() {
      		this.$el.html(this.cardTemplate(this.model.toJSON()));
      		return this.$el;
      	},

      	renderMarker: function() {
      		return $(this.markerTemplate(this.model.toJSON()));
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

	var renderRestaurantMarkers = function(restaurants) {
		$('.c-marker').remove();

		restaurants.forEach(function(restaurant) {
			var view = new Turnip.RestaurantView({model: restaurant});
			$('.c-map').append(view.renderMarker());
		});
	}

	Turnip.Restaurants = Restaurants;
	Turnip.MapView = new MapView;
	Turnip.RestaurantView = RestaurantView;
	Turnip.renderRestaurantMarkers = renderRestaurantMarkers;
});
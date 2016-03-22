$(function() {
	var MapView = Backbone.View.extend({
		el: $('#main'), 
		template: _.template($('#map-template').html()),

		events: {
			'click .c-marker': 'viewRestaurant'
		},

		render: function() {
			this.$el.html(this.template());
			return this.$el;
		},

		viewRestaurant: function() {
			// show the restaurant detail view
			// get the resto based on marker index?
			console.log('clicked a resto');
		}
	});

	Turnip.MapView = new MapView;
});
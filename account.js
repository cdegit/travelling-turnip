$(function() {
	var AccountView = Backbone.View.extend({
		el: $('#main'),
		loggedOutTemplate: _.template($('#account-logged-out-template').html()),
		loggedInTemplate: _.template($('#account-logged-in-template').html()),

		events: {
			'submit .js-login-form': 'login',
			'click .js-logout': 'logout',
			'click .js-veggie-toggle': 'toggleVeggie',
			'click .js-vegan-toggle': 'toggleVegan',
			'click .js-gf-toggle': 'toggleGF'
		},

		initialize: function() {
			Turnip.User.fetch();
			this.model = Turnip.User;
		},

		render: function() {
			var templateName;

			if (this.model.get('loggedIn')) {
				templateName = 'loggedInTemplate';
			} else {
				templateName = 'loggedOutTemplate';
			}

			this.$el.html(this[templateName](this.model.toJSON()));

			this.setVeggieIcon();
			this.setVeganIcon();
			this.setGFIcon();

			return this.$el;
		},

		login: function(e) {
			var username = this.$el.find('input[type=text]').val();
			e.preventDefault();
			Turnip.User.login(username);

			this.render();
		},

		logout: function() {
			Turnip.User.logout();

			this.render();
		},

      	toggleVeggie: function() {
      		this.model.toggleVeggie();
      		this.setVeggieIcon();
      	},

      	setVeggieIcon: function() {
      		if (this.model.get('veggie')) {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-active.png');
      		} else {
      			this.$el.find('.js-veggie-toggle img').attr('src', 'img/icon_veggie-inactive.png');
      		}
      	},

      	toggleVegan: function() {
      		this.model.toggleVegan();
      		this.setVeganIcon();
      	},

      	setVeganIcon: function() {
      		if (this.model.get('vegan')) {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-active.png');
      		} else {
      			this.$el.find('.js-vegan-toggle img').attr('src', 'img/icon_vegan-inactive.png');
      		}
      	},

      	toggleGF: function() {
      		this.model.toggleGF();
      		this.setGFIcon();
      	},

      	setGFIcon: function() {
      		if (this.model.get('gf')) {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-active.png');
      		} else {
      			this.$el.find('.js-gf-toggle img').attr('src', 'img/icon_gf-inactive.png');
      		}
      	}
	});

	var SettingsView = Backbone.View.extend({
		el: $('#main'),
		template: _.template($('#settings-template').html()),

		events: {
			'change input': 'toggleSetting'
		},

		initialize: function() {
			this.model = Turnip.User;
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

	Turnip.AccountView = new AccountView;
	Turnip.SettingsView = new SettingsView;
});
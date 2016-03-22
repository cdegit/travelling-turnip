$(function() {
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
			'submit .js-phrases-form': 'addNewPhrase'
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

	    	if (Turnip.Router) {
	    		Turnip.Router.navigate('phrases', {trigger: true});
	    	}
	    }
	});

	Turnip.Phrases = Phrases;
	Turnip.PhrasesView = new PhrasesContainerView;
});
var defaultData = {
	meals: [{
		id: 1,
		title: 'Rosemary Focaccia',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		nearby: true,
		recipes: true,
		desc: 'Perfect for feeding a crowd, focaccia is a flavorful and easy-to-make Italian flat bread baked in a sheet pan.',
		saved: false,
		about: 'Focaccia, known and loved in Italy and abroad, is yeasted flat bread which belongs essentially to the northern shores of the Mediterranean and has its origin in classical antiquity. Early versions were cooked on the hearth of a hot fire, or on a heated tile or earthenware disk, like the related flatbreads. Bakers often puncture the bread with a knife to relieve bubbling on the surface of the bread.',
		history: 'Many regions of Italy have an inventive range of flavorings they add to their focaccia. For many centuries it has had an association with Christmas Eve and Epiphany. In the Italian context one thing is',
		recipes: [{
			id: 1,
			mealId: 1,
			title: 'Nonna\'s Focaccia',
			prepTime: '10 mins',
			cookTime: '20 mins',
			excerpt: '1 ENVELOPE (2 1/4 TSPS) ACTIVE DRY YEAST...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: false
			},
			ingredients: [{
				eng: '2 tablespoons red-wine vinegar',
				ital: '2 cucchiai di aceto di vino rosso'
			},{
				eng: '1 tablespoon extra-virgin olive oil',
				ital: 'olio d\'oliva 1 cucchiaio di extra vergine'
			},{
				eng: '2 tablespoons grated Parmesan',
				ital: '2 cucchiai di parmigiano grattugiato'
			},{
				eng: '1 teaspoon honey',
				ital: '1 cucchiaino di miele'
			},{
				eng: '2 cups corn kernels (from 3 ears corn)',
				ital: 'noccioli di 2 tazze di mais (da 3 spighe di mais)'
			},{
				eng: '1/2 English cucumber, sliced into 1/4-inch half-moons',
				ital: '1/2 cetriolo inglese, tagliato in 1/4-inch mezze lune'
			},{
				eng: '1 small head radicchio, cut into 1-inch pieces',
				ital: '1 piccolo radicchio testa, tagliato in pezzi da 1 pollice'
			}]
		}]
	},{
		id: 2,
		title: 'Radicchio Salad',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		nearby: true,
		recipes: true,
		desc: 'Perfect for feeding a crowd, focaccia is a flavorful and easy-to-make Italian flat bread baked in a sheet pan.',
		saved: false,
		about: 'Focaccia, known and loved in Italy and abroad, is yeasted flat bread which belongs essentially to the northern shores of the Mediterranean and has its origin in classical antiquity. Early versions were cooked on the hearth of a hot fire, or on a heated tile or earthenware disk, like the related flatbreads. Bakers often puncture the bread with a knife to relieve bubbling on the surface of the bread.',
		history: 'Many regions of Italy have an inventive range of flavorings they add to their focaccia. For many centuries it has had an association with Christmas Eve and Epiphany. In the Italian context one thing is',
		recipes: [{
			id: 1,
			mealId: 2,
			title: 'Nonna\'s Focaccia',
			prepTime: '10 mins',
			cookTime: '10 mins',
			excerpt: '1 ENVELOPE (2 1/4 TSPS) ACTIVE DRY YEAST...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: false
			},
			ingredients: [{
				eng: '2 tablespoons red-wine vinegar',
				ital: '2 cucchiai di aceto di vino rosso'
			}]
		}]
	}],
	restaurants: [{
		id: 1,
		name: 'Ristorante Italiano',
		restrictions: {
			veggie: true,
			vegan: false,
			gf: false
		},
		rating: 3,
		desc: 'We serve homemade pizza, lasagna, and more!',
		saved: false,
		site: '',
		phone: '+39 06 446 2046',
		hours: 'CLOSED NOW. OPENS AT 12:00PM',
		availableMeals: [
			'Vegan Lasagna',
			'Homemade spaghetti with mushrooms'
		]
	},{
		id: 2,
		name: 'Via dei Castani',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		rating: 4,
		desc: 'Welcome to Roma\'s finest restaurant, serving excellent traditional dishes that will satisfy your cravings. We have over a decade of experience!',
		saved: false,
		site: 'VIADEICASTANI.IT',
		phone: '+39 06 230 4855',
		hours: 'CLOSED NOW. OPENS AT 9:00AM',
		availableMeals: [
			'Vegan Antipasto',
			'Vegetarian thin crust avocado pizza'
		]
	}],
	phraseComponents: [{
		english: 'I\'m vegan',
		italian: 'Io sono vegano'
	},{
		english: 'I\'m vegetarian',
		italian: 'Io sono vegetaliano'
	},{
		english: 'Organic only, please',
		italian: 'Italian translation goes here'
	},{
		english: 'Gluten-free only, please',
		italian: 'Italian translation goes here'
	},{
		english: 'Can I make this vegan?',
		italian: 'Italian translation goes here'
	},{
		english: 'Can I get this without meat?',
		italian: 'Italian translation goes here'
	},{
		english: 'Can I pack this to go?',
		italian: 'Italian translation goes here'
	},{
		english: 'How long do I need to wait for my meal?',
		italian: 'Italian translation goes here'
	},{
		english: 'How long do I need to wait for a table?',
		italian: 'Italian translation goes here'
	},{
		english: 'The bill, please',
		italian: 'Italian translation goes here'
	}]
};

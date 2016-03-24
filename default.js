var defaultData = {
	meals: [{
		id: 1,
		title: 'Focaccia',
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
			prepTime: '3 hours',
			cookTime: '30 mins',
			excerpt: '2 tablespoons red-wine vinegar...',
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
			}],
			instructions: [
				'Combine the warm water, yeast and sugar in a small bowl. Put the bowl in a warm, not hot or cool, place until the yeast is bubbling and aromatic, at least 15 minutes.',
				'In the bowl of a mixer fitted with a dough hook, combine the flour, 1 tablespoon of kosher salt, 1/2 cup olive oil and the yeast mixture on low speed. Once the dough has come together, continue to knead for 5 to 6 minutes on a medium speed until it becomes smooth and soft. Give it a sprinkle of flour if the dough is really sticky and tacky',
				'Transfer the dough to a clean, lightly floured surface, then knead it by hand 1 or 2 times. Again, give it another sprinkle of flour if the dough is really sticky and tacky.',
				'Coat the inside of the mixer bowl lightly with olive oil and return the dough to the bowl. Cover it with plastic wrap and put it in a warm place until the dough has doubled in size, at least 1 hour.',
				'Coat a jelly roll pan with the remaining 1/2 cup olive oil. (Chef\'s Note: This may seem excessive, but focaccia is an oily crusted bread. This is why it is soooooooooo delicious!).',
				'Put the dough onto the jelly roll pan and begin pressing it out to fit the size of the pan. Turn the dough over to coat the other side with the olive oil. Continue to stretch the dough to fit the pan. As you are doing so, spread your fingers out and make finger holes all the way through the dough. (Chef\'s Note: Yes, this is strange. But when the dough rises again it will create the characteristic craggy looking focaccia. If you do not make the actual holes in the dough, the finished product will be very smooth.)',
				'Put the dough in the warm place until it has doubled in size, about 1 hour. While the dough is rising a second time, preheat the oven to 425 degrees F.',
				'Liberally sprinkle the top of the focaccia with some coarse sea salt and lightly drizzle a little oil on top. Bake the dough until the top of the loaf is golden brown, about 25 to 30 minutes. Remove the focaccia from the oven and let it cool before cutting and serving.'
			]
		},{
			id: 2,
			mealId: 1,
			title: 'Onion and Rosemary Focaccia',
			prepTime: '30 mins',
			cookTime: '30 mins',
			excerpt: '1/2 English cucumber, sliced into...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: false
			},
			ingredients: [{
				eng: '1/2 English cucumber, sliced into 1/4-inch half-moons',
				ital: '1/2 cetriolo inglese, tagliato in 1/4-inch mezze lune'
			},{
				eng: '2 tablespoons red-wine vinegar',
				ital: '2 cucchiai di aceto di vino rosso'
			},{
				eng: '2 cups corn kernels (from 3 ears corn)',
				ital: 'noccioli di 2 tazze di mais (da 3 spighe di mais)'
			},{
				eng: '2 tablespoons grated Parmesan',
				ital: '2 cucchiai di parmigiano grattugiato'
			},{
				eng: '1 tablespoon extra-virgin olive oil',
				ital: 'olio d\'oliva 1 cucchiaio di extra vergine'
			},{
				eng: '1 teaspoon honey',
				ital: '1 cucchiaino di miele'
			},{
				eng: '1 small head radicchio, cut into 1-inch pieces',
				ital: '1 piccolo radicchio testa, tagliato in pezzi da 1 pollice'
			}],
			instructions: [
				'Make the basic dough, adding 2 tbsp olive oil and only a pinch of salt. While the dough is rising, cook onions in 1 tbsp olive oil for 5 mins until soft, then set aside.',
				'When the dough has risen, knock it back and stretch it to fit an oiled Swiss roll tin about 25 x 35cm. Leave the dough to prove for about 20 mins.',
				'Heat oven to 200C/fan 180C/gas 6. Spread the onions over the dough and scatter with the rosemary. Press your fingers into the dough to make dimples, drizzle the remaining oil over and scatter over the salt, then bake for 30 mins until golden. Leave to cool, then serve cut or torn into squares.'
			]
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
		desc: 'This is a distinctly grown-up salads, with heightened and complicated flavors.',
		saved: false,
		about: 'There are salads for a crowd, and salads that kids adore. There are colorful slaws, and playful mescluns, salads crunchy and light. But then there are the distinctly grown-up salads, with heightened and complicated flavors. This is one of those. It has just five ingredients, but together they make a stunningly unusual composition of bitter, sweet, and salty-savory. Ready? This is fall salad, all dressed up and glamorous.',
		history: 'Pliny the Elder claimed radicchio was useful as a blood purifier and an aid for insomniacs in Naturalis Historia. In fact, radicchio contains intybin, a sedative/analgesic, as well as a type of flavonoid called anthocyanin which is used for making dye-sensitized solar cells. Modern cultivation of the plant began in the fifteenth century, in the Veneto, Friuli Venezia Giulia and Trentino regions of Italy, but the deep-red radicchio of today was engineered in 1860 by the Belgian agronomist Francesco Van den Borre, who used a technique called imbianchimento (whitening), preforcing, or blanching to create the dark red, white-veined leaves: radicchio plants are taken from the ground and placed in water in darkened sheds, where lack of light and ensuing inhibition of chlorophyll production cause the plants to lose their green pigmentation.',
		recipes: [{
			id: 1,
			mealId: 2,
			title: 'Delicious Radicchio Salad',
			prepTime: '10 mins',
			cookTime: '10 mins',
			excerpt: '1 small head red radicchio...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: false
			},
			ingredients: [{
				eng: '1 small head red radicchio',
				ital: 'radicchio rosso 1 piccola testa'
			},{
				eng: '1 cup Castelvetrano olives, brine reserved',
				ital: '1 tazza di Castelvetrano olive, salamoia riservati'
			},{
				eng: '2 tablespoons extra-virgin olive oil',
				ital: '2 cucchiai di olio extravergine d\'oliva'
			},{
				eng: '1 tablespoon aged balsamic vinegar',
				ital: '1 cucchiaio di aceto balsamico invecchiato'
			},{
				eng: '1 tablespoon honey, optional',
				ital: '1 cucchiaio di miele, opzionale'
			},{
				eng: 'About 2 ounces Parmesan or Grana Padano cheese',
				ital: 'Circa 2 once di parmigiano o grana padano'
			},{
				eng: 'Flaky salt and freshly ground black pepper',
				ital: 'sale traballante e pepe nero appena macinato'
			}],
			instructions: [
				'Core the radicchio and discard any browned outer leaves. Tear the leaves into bite-sized pieces and put them in a large bowl.',
				'Pit the olives and cut each one in half lengthwise. Smash each lightly with the flat of a knife, to flatten. Toss the olives with the radicchio, massaging the leaves lightly with your hands.',
				'Whisk together the olive oil, balsamic vinegar, and 1 tablespoon olive brine. Taste for sweetness, and add a drizzle or more of honey if desired. Toss the dressing with the radicchio.',
				'Use a vegetable peeler to create large, thick flakes of cheese and toss with the salad, along with salt and pepper to taste. Serve within an hour, garnished with additional cheese if desired.'
			]
		}]
	},{
		id: 3,
		title: 'Antipasto Salad',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		nearby: true,
		recipes: true,
		desc: 'Antipasto (plural antipasti) means "before the meal" (from Latin ante, meaning "before", and pastus, meaning "meal, pasture"), and is the traditional first course of a formal Italian meal.',
		saved: false,
		about: 'Antipasto (plural antipasti) means "before the meal" (from Latin ante, meaning "before", and pastus, meaning "meal, pasture"), and is the traditional first course of a formal Italian meal. Traditional antipasto includes cured meats, olives, peperoncini, mushrooms,anchovies, artichoke hearts, various cheeses (such as provolone or mozzarella), pickled meats, and vegetables in oil or vinegar.',
		history: 'The contents of an antipasto vary greatly according to regional cuisine. It is quite possible to find different preparations of saltwater fish and traditional southern cured meats (like soppressata or \'nduja) in the south of Italy, whereas in northern Italy it will contain different kinds of cured meats and mushrooms and, especially near lakes, preparations of freshwater fish. The cheeses included also vary significantly between regions and backgrounds. Many compare antipasto to hors d\'oeuvre, but antipasto is served at the table and signifies the official beginning of the Italian meal. It may also be referred to as a starter, or an entrée.',
		recipes: [{
			id: 1,
			mealId: 3,
			title: 'A+ Antipasto Salad',
			prepTime: '10 mins',
			cookTime: '10 mins',
			excerpt: '1/2 head romaine lettuce...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: false
			},
			ingredients: [{
				eng: '1/2 head romaine lettuce, cut into bite-size pieces',
				ital: '1/2 testa lattuga romana, tagliato in pezzi di bite-size'
			},{
				eng: '1/2 head butter lettuce, cut into bite-size pieces',
				ital: '1/2 testa di burro lattuga, tagliato in piccole parti'
			},{
				eng: '1/2 head iceberg lettuce, cut into bite-size pieces',
				ital: '1/2 testa di lattuga iceberg, tagliato in pezzi di bite-size'
			},{
				eng: '1 cup rinsed canned red kidney beans, patted dry',
				ital: '1 tazza di sciacquato in scatola fagioli rossi, accarezzò secco'
			},{
				eng: '1 cup rinsed canned garbanzo beans, patted dry',
				ital: '1 tazza di ceci in scatola sciacquati fagioli, accarezzò secco'
			},{
				eng: '8 ounces salami, cubed',
				ital: '8 once salame a cubetti'
			},{
				eng: '6 ounces Provolone, cubed',
				ital: '6 once Provolone, Cubed'
			},{
				eng: '2 tomatoes, coarsely chopped',
				ital: '2 pomodori, tritate grossolanamente'
			},{
				eng: 'Red Wine Vinaigrette',
				ital: 'Vino Rosso Vinaigrette'
			}],
			instructions: [
				'Combine the first 8 ingredients in a large bowl.',
				'Toss with enough vinaigrette to coat.',
				'Season the salad with salt and pepper, to taste, and serve.'
			]
		}]
	},{
		id: 4,
		title: 'Eggplant Caponata',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		nearby: true,
		recipes: true,
		desc: 'Caponata (Sicilian: capunata) is a Sicilian eggplant (aubergine) dish consisting of a cooked vegetable salad made from chopped fried eggplant and celery seasoned with sweetened vinegar, with capers in a sweet and sour sauce.',
		saved: false,
		about: 'Every Sicilian grandmother has a recipe for caponata – some calling for as much as a cup of olive oil. No offense to those nonnas, but that’s overkill in my book. While this recipe certainly doesn’t skimp on the oil, I rely more on spicy red pepper, fresh herbs, and raw garlic to provide bold flavor. Rather than a traditional chunky, relish-y caponata, this one is more like a spread, due to the roasted eggplant. It’s delicious on crusty bread. I tried it out on the Italian nun who lives next door to me (seriously!). Of course, she’s not a nonna, but her approval was good enough for me.',
		history: 'Caponata (Sicilian: capunata) is a Sicilian eggplant (aubergine) dish consisting of a cooked vegetable salad made from chopped fried eggplant and celery seasoned with sweetened vinegar, with capers in a sweet and sour sauce. Numerous local variations of the ingredients exist with some versions adding olives, carrots and green bell peppers, and others adding potatoes, or pine nuts and raisins.',
		recipes: [{
			id: 1,
			mealId: 4,
			title: 'Spicy Eggplant Caponata',
			prepTime: '10 mins',
			cookTime: '10 mins',
			excerpt: '1 1/2 pounds eggplant (1 large)...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: true
			},
			ingredients: [{
				eng: '1 1/2 pounds eggplant (1 large)',
				ital: '1 1/2 chili di melanzane (1 grande)'
			},{
				eng: '3 tablespoons olive oil',
				ital: '3 cucchiai di olio d\'oliva'
			},{
				eng: '1 medium onion, chopped',
				ital: '1 cipolla media tritata'
			},{
				eng: '2 ribs celery, inner stalks, diced',
				ital: '2 costole di sedano, steli interni, dadini'
			},{
				eng: '1 teaspoon crushed red pepper flakes',
				ital: '1 cucchiaino tritato peperoncino'
			},{
				eng: '1½ cups Pomi chopped tomatoes',
				ital: '1½ tazze Pomi polpa di pomodoro'
			},{
				eng: '¼ cup red wine vinegar (make sure your vinegar is gluten-free if you are gluten-sensitive)',
				ital: '¼ tazza di aceto di vino rosso (assicuratevi che il vostro aceto è priva di glutine, se siete glutine)'
			},{
				eng: '1 tablespoon sugar',
				ital: '1 cucchiaio di zucchero'
			},{
				eng: 'Pinch cinnamon',
				ital: 'pinch cannella'
			},{
				eng: '½ teaspoon fresh thyme (optional but good)',
				ital: '½ cucchiaino di timo fresco (facoltativo ma buono)'
			},{
				eng: '2 tablespoons capers, rinsed and drained',
				ital: '2 cucchiai di capperi, sciacquati e scolati'
			},{
				eng: '8 chopped pitted kalamata olives',
				ital: '8 Polpa di olive snocciolate Kalamata'
			},{
				eng: '¼ cup minced roasted red peppers (optional)',
				ital: '¼ di tazza tritato peperoni arrostiti rosso (opzionale)'
			},{
				eng: '3 tablespoons pine nuts, lightly toasted',
				ital: '3 cucchiai di pinoli, leggermente tostato'
			},{
				eng: '3 tablespoons golden raisins, roughly chopped',
				ital: '3 cucchiai di uvetta, tritate grossolanamente'
			},{
				eng: '2 tablespoons chopped flat-leaf parsley',
				ital: '2 cucchiai di trito di prezzemolo a foglia liscia'
			},{
				eng: '1 teaspoon finely minced garlic',
				ital: '1 cucchiaino di aglio tritato finemente'
			},{
				eng: 'Salt and freshly ground pepper to taste',
				ital: 'Sale e pepe appena macinato a piacere'
			}],
			instructions: [
				'Preheat the oven to 400 degrees.',
				'Cut the eggplant in half lengthwise and score once or twice with a knife (not hitting the skin.) Roast face down on a baking sheet, covered in foil and sprayed with oil, until tender – about 20 minutes. Let drain in a colander for 10 minutes, cut side down. Scoop the eggplant out of the skin and chop coarsely.',
				'Heat 2 tablespoons oil over medium heat in a large, heavy skillet. Add the onion, celery and red pepper flakes and cook for 5 minutes. Add the tomatoes, vinegar, cinnamon and sugar and cook for 5 minutes more. Add the remaining oil, eggplant, capers, red peppers, olives, pine nuts, raisins and parsley and cook for 5 minutes more. Add garlic. Season to taste. Cool to room temperature.'
			]
		},{
			id: 2,
			mealId: 4,
			title: 'Eggplant Caponata II',
			prepTime: '10 mins',
			cookTime: '10 mins',
			excerpt: '1 1/2 pounds eggplant (1 large)...',
			saved: false,
			restrictions: {
				veggie: true,
				vegan: true,
				gf: true
			},
			ingredients: [{
				eng: '1 1/2 pounds eggplant (1 large)',
				ital: '1 1/2 chili di melanzane (1 grande)'
			},{
				eng: '3 tablespoons olive oil',
				ital: '3 cucchiai di olio d\'oliva'
			},{
				eng: '1 medium onion, chopped',
				ital: '1 cipolla media tritata'
			},{
				eng: '2 ribs celery, inner stalks, diced',
				ital: '2 costole di sedano, steli interni, dadini'
			},{
				eng: '1 teaspoon crushed red pepper flakes',
				ital: '1 cucchiaino tritato peperoncino'
			},{
				eng: '1½ cups Pomi chopped tomatoes',
				ital: '1½ tazze Pomi polpa di pomodoro'
			},{
				eng: '¼ cup red wine vinegar (make sure your vinegar is gluten-free if you are gluten-sensitive)',
				ital: '¼ tazza di aceto di vino rosso (assicuratevi che il vostro aceto è priva di glutine, se siete glutine)'
			},{
				eng: '1 tablespoon sugar',
				ital: '1 cucchiaio di zucchero'
			},{
				eng: 'Pinch cinnamon',
				ital: 'pinch cannella'
			},{
				eng: '½ teaspoon fresh thyme (optional but good)',
				ital: '½ cucchiaino di timo fresco (facoltativo ma buono)'
			},{
				eng: '2 tablespoons capers, rinsed and drained',
				ital: '2 cucchiai di capperi, sciacquati e scolati'
			},{
				eng: '8 chopped pitted kalamata olives',
				ital: '8 Polpa di olive snocciolate Kalamata'
			},{
				eng: '¼ cup minced roasted red peppers (optional)',
				ital: '¼ di tazza tritato peperoni arrostiti rosso (opzionale)'
			},{
				eng: '3 tablespoons pine nuts, lightly toasted',
				ital: '3 cucchiai di pinoli, leggermente tostato'
			},{
				eng: '3 tablespoons golden raisins, roughly chopped',
				ital: '3 cucchiai di uvetta, tritate grossolanamente'
			},{
				eng: '2 tablespoons chopped flat-leaf parsley',
				ital: '2 cucchiai di trito di prezzemolo a foglia liscia'
			},{
				eng: '1 teaspoon finely minced garlic',
				ital: '1 cucchiaino di aglio tritato finemente'
			},{
				eng: 'Salt and freshly ground pepper to taste',
				ital: 'Sale e pepe appena macinato a piacere'
			}],
			instructions: [
				'In a large 12 to 14-inch saute pan, over medium heat, heat the olive oil until hot but not smoking. Add the onions, pine nuts, currants and chili flakes and saute for 4 to 5 minutes until softened.',
				'Add the eggplant, sugar, cinnamon, and cocoa and continue to cook for 5 more minutes. Add the thyme, tomato sauce, and balsamic vinegar. Bring the mixture to a boil.',
				'Lower the heat and simmer the mixture for 5 minutes. Remove from the heat and allow to cool to room temperature, garnish with mint and chili flakes. Serve the caponata spooned on crostini or in middle of table with crostini on side to allow guests to help themselves.'
			]
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
		location: [100, 100],
		rating: 3,
		desc: 'We serve homemade pizza, lasagna, and more!',
		saved: false,
		site: '',
		phone: '+39 06 446 2046',
		hours: 'CLOSED NOW. OPENS AT 12:00PM',
		availableMeals: [
			'Vegan Lasagna',
			'Homemade spaghetti with mushrooms',
			'Rosemary Focaccia'
		]
	},{
		id: 2,
		name: 'Via dei Castani',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: false
		},
		location: [350, 250],
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
	},{
		id: 3,
		name: 'Da Vittorio',
		restrictions: {
			veggie: true,
			vegan: false,
			gf: true
		},
		location: [420, 90],
		rating: 4,
		desc: 'Da Vittorio restaurant, located in the Da Vittorio Relais & Chateaux resort, has earned three Michelin stars for its cuisine. Some of the ingredients you\'ll find on the menu include vegetables from Piedmont and langoustines from Mazara del Vallo.',
		saved: false,
		site: 'vittorio.it',
		phone: '+39 06 230 4855',
		hours: 'CLOSED NOW. OPENS AT 11:00AM',
		availableMeals: [
			'Vegan Antipasto',
			'Vegetarian thin crust avocado pizza',
			'Eggplant Caponata'
		]
	},{
		id: 4,
		name: 'Enoteca Pinchiorri',
		restrictions: {
			veggie: true,
			vegan: true,
			gf: true
		},
		location: [90, 304],
		rating: 5,
		desc: 'Chef Annie Feolde is the first woman in Italy to earn three Michelin stars. Her innovative Italian cooking is heightened by an incredible wine selection by sommelier Giorgio Pinchiorri. A popular dish is a risotto of fregola, pumpkin flowers, saffron, and dried fruit.',
		saved: false,
		site: 'enoteca.it',
		phone: '+39 06 230 4855',
		hours: 'CLOSED NOW. OPENS AT 11:00AM',
		availableMeals: [
			'Vegan Antipasto',
			'Vegetarian thin crust avocado pizza',
			'Radicchio Salad'
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

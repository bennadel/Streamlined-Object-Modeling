
// Configure the path to all of the modules. Since we're defining the baseUrl as the 
// model directory, all modules (without relative paths) will be assumed to be loaded
// from within the model directory.
require.config({
	baseUrl: "js/model/",
	paths: {
		lodash: "../../../vendor/lodash/lodash-2.2.1"
	},
	shim: {
		lodash: {
			explorts: "_"
		}
	}
});


// Build, join, test, and have fun with the model.
require(
	[ "DateOfBirth", "Person", "SocialCircle" ],
	function( DateOfBirth, Person, SocialCircle ) {


		console.log( "Modules have been defined." );
		console.log( "Main." );


		// Create some people to play with.
		var people = {
			women: [
				new Person( "Tricia Smith", "F", new DateOfBirth( "1974/04/12" ) ),
				new Person( "Joanna Smith", "F", new DateOfBirth( "1978/01/30" ) ),
				new Person( "Sarah Smith", "F", new DateOfBirth( "1968/11/04" ) ),
				new Person( "Kim Smith", "F", new DateOfBirth( "1983/12/25" ) ),
				new Person( "Heather Smith", "F", new DateOfBirth( "1980/02/11" ) ),
				new Person( "Anna Smith", "F", new DateOfBirth( "1977/07/17" ) ),
				new Person( "Kelly Smith", "F", new DateOfBirth( "1981/03/26" ) )
			],
			men: [
				new Person( "Vincent Smith", "M", new DateOfBirth( "1975/05/13" ) ),
				new Person( "Kevin Smith", "M", new DateOfBirth( "1977/02/29" ) ),
				new Person( "Arnold Smith", "M", new DateOfBirth( "1969/10/05" ) ),
				new Person( "Sly Smith", "M", new DateOfBirth( "1982/11/24" ) ),
				new Person( "Jason Smith", "M", new DateOfBirth( "1979/03/12" ) ),
				new Person( "Miles Smith", "M", new DateOfBirth( "1978/06/16" ) ),
				new Person( "Johnny Smith", "M", new DateOfBirth( "1980/04/25" ) )
			]
		};


		var socialCircle = new SocialCircle();

		socialCircle.addPerson( people.women[ 0 ] );
		socialCircle.addPerson( people.men[ 0 ] );
		
		socialCircle.addPerson( people.women[ 1 ] );
		socialCircle.addPerson( people.men[ 1 ] );
		
		socialCircle.addPerson( people.women[ 2 ] );
		socialCircle.addPerson( people.men[ 2 ] );
		
		socialCircle.addPerson( people.women[ 3 ] );
		socialCircle.addPerson( people.men[ 3 ] );
		
		socialCircle.addPerson( people.women[ 4 ] );
		socialCircle.addPerson( people.men[ 4 ] );
		
		socialCircle.addPerson( people.women[ 5 ] );
		socialCircle.addPerson( people.men[ 5 ] );
		
		socialCircle.addPerson( people.women[ 6 ] );
		socialCircle.addPerson( people.men[ 6 ] );


		var tricia = people.women[ 0 ];
		var sarah = people.women[ 2 ];
		var vincent = people.men[ 0 ];

		tricia.addAttraction( vincent );
		vincent.addAttraction( sarah );


		console.log( socialCircle );


	}
);

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
	[ "DateOfBirth", "Person", "Attraction" ],
	function( DateOfBirth, Person, Attraction ) {


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


		var joanna = new Person( "Joanna Smith", "F", new DateOfBirth( "1978/01/30" ) );
		var jason = new Person( "Jason Smith", "M", new DateOfBirth( "1979/03/12" ) );

		var attraction = new Attraction( joanna, jason );


		console.log( "Joanna likes Jason:", joanna.isAttractedTo( jason ) );

		console.log( "Owned by Joanna:", attraction.isOwnedBy( joanna ) );

		// Make sure owner cannot be changed.
		try {

			attraction.addOwner( jason );

		} catch ( error ) {

			console.log( error );

		}

		// Make sure owner and target cannot be the same.
		try {

			var attraction = new Attraction( joanna, joanna );

		} catch ( error ) {

			console.log( error );

		}

		console.log( joanna );
		console.log( attraction );


	}
);
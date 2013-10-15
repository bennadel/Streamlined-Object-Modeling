
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
	[ "DateOfBirth", "Person" ],
	function( DateOfBirth, Person ) {


		console.log( "Modules have been defined." );
		console.log( "Main." );


		// Create some people to play with.
		var people = {
			women: [
				new Person( 101, "Tricia Smith", "F", new DateOfBirth( "1974/04/12" ) ),
				new Person( 102, "Joanna Smith", "F", new DateOfBirth( "1978/01/30" ) ),
				new Person( 103, "Sarah Smith", "F", new DateOfBirth( "1968/11/04" ) ),
				new Person( 104, "Kim Smith", "F", new DateOfBirth( "1983/12/25" ) ),
				new Person( 105, "Heather Smith", "F", new DateOfBirth( "1980/02/11" ) ),
				new Person( 106, "Anna Smith", "F", new DateOfBirth( "1977/07/17" ) ),
				new Person( 107, "Kelly Smith", "F", new DateOfBirth( "1981/03/26" ) )
			],
			men: [
				new Person( 201, "Vincent Smith", "M", new DateOfBirth( "1975/05/13" ) ),
				new Person( 202, "Kevin Smith", "M", new DateOfBirth( "1977/02/29" ) ),
				new Person( 203, "Arnold Smith", "M", new DateOfBirth( "1969/10/05" ) ),
				new Person( 204, "Sly Smith", "M", new DateOfBirth( "1982/11/24" ) ),
				new Person( 205, "Jason Smith", "M", new DateOfBirth( "1979/03/12" ) ),
				new Person( 206, "Miles Smith", "M", new DateOfBirth( "1978/06/16" ) ),
				new Person( 207, "Johnny Smith", "M", new DateOfBirth( "1980/04/25" ) )
			]
		};



	}
);
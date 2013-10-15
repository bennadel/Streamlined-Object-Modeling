
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
		console.log( "Main:" );

		
		// var tricia = new Person( "Tricia Smith", "F", "1980/01/15" );
		// console.log( tricia );


		var dob = new DateOfBirth( "September 1, 1980" );
		console.log( dob.isAgeLT( 33 ) );
		console.log( dob.isAgeLTE( 33 ) );
		console.log( dob.isAgeEQ( 33 ) );
		console.log( dob.isAgeGTE( 33 ) );
		console.log( dob.isAgeGT( 33 ) );


	}
);
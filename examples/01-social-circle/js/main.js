
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
	[ "Person" ],
	function( Person ) {


		console.log( "Modules have been defined." );
		console.log( "Main:" );

		console.log( Person );


	}
);
define(
	[
		// "lib/MyModuleA",
		// "lib/MyModuleB"
	],
	function( /* ModuleA, ModuleB */ ) {

		return({

			// I run ONCE before ANY the test methods have executed.
			beforeTests: function() {

				this.info( "beforeTests()" );

			},


			// I run ONCE after ALL the test methods have executed.
			afterTests: function() {

				this.info( "afterTests()" );

			},


			// Sample test method...
			testThatThisRuns: function() {

				// Runs failure...
				this.assert( true === false );

			},


			// Sample test method...
			testThatThisRunsAlso: function() {

				// Runs failure...
				// --
				// NOTE: assertIsValidEmail() is a custom assertion method in TestCase.js.
				this.assertIsValidEmail( "Ben Nadel" );

			}

		});

	}
);
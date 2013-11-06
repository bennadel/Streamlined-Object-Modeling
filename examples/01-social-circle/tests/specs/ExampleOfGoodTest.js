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

				// Runs successfully...	
				this.assert( true );
			
			},


			// Sample test method...
			testThatThisRunsAsWell: function() {

				// Runs successfully...	
				// --
				// NOTE: assertIsValidEmail() is a custom assertion method in TestCase.js.
				this.assertIsValidEmail( "ben@bennadel.com" );
			
			},


			// Non-test method. Since this method name does not start with "test", it should
			// not be invoked by TinyTestJS. This method will, however, be available to your
			// other test methods.
			// --
			// If this method should be shared across test cases, consider putting it in the
			// "TestCase.js" file located within this same directory.
			proveThatNonStandardNamesWillNotRun: function() {

				this.fail( "Non-test method invoked incorrectly." );

			}
			
		});

	}
);
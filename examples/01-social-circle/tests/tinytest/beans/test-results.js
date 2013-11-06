require.tinytest.factory(
	"TestResults",
	function() {

		// I initialize the test results.
		function TestResults() {

			// I determine the time delimiters for the duration of testing.
			this.startTime = this.getTickCount();	
			this.endTime = 0;

			// I keep track of the number of test methods that have been executed.
			this.testCount = 0;

			// I will contain the first error that is raised during testing. Testing is halted
			// once the first error is found.
			this.error = null;

		}


		// Define the instance methods.
		TestResults.prototype = {

			// I finalize the test results with the given error.
			endTestingWithError: function( error ) {

				if ( this.isComplete() ) {

					throw( new Error( "Testing is already complete." ) );

				}

				this.endTime = this.getTickCount();

				this.error = error;				

			},


			// I finalize the test results with a successful completion.
			endTestingWithSuccess: function() {

				if ( this.isComplete() ) {

					throw( new Error( "Testing is already complete." ) );

				}

				this.endTime = this.getTickCount();

			},


			// I get the duration that the test have been running (or have ran until completion).
			getDuration: function() {

				if ( this.isComplete() ) {

					return( this.endTime - this.startTime );

				}

				return( this.getTickCount() - this.startTime );

			},


			// I return the underlying error object for tests that failed to complete successfully.
			getError: function() {

				if ( this.error === null ) {

					throw( new Error( "Error not available." ) );

				}

				return( this.error );

			},


			// I return the number of tests that have been executed.
			getTestCount: function() {

				return( this.testCount );

			},


			// I get the current UTC time in milliseconds.
			getTickCount: function() {

				return( ( new Date() ).getTime() );

			},


			// I increment the succesfully executed test count.
			incrementTestCount: function() {

				this.testCount++;

			},


			// I determine if the tests have finished executing.
			isComplete: function() {

				return( this.endTime !== 0 );

			},


			// I determine if one of the tests failed.
			isFailed: function() {

				if ( ! this.isComplete() ) {

					throw( new Error( "Testing is not complete." ) );

				}

				return( this.error !== null );

			},


			// I determine if the tests all executed successfully.
			isPassed: function() {

				if ( ! this.isComplete() ) {

					throw( new Error( "Testing is not complete." ) );

				}

				return( this.error === null );

			}

		};


		return( TestResults );

	}
);
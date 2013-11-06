require.tinytest.factory(
	"TestSuite",
	function( TestCase, proxyTestCaseMethods, TestResults, TestError, _ ) {

		// I initialize the test suite.
		function TestSuite( specs ) {

			// I hold the tests case modules (the actual JavaScript objects) that contain
			// the test methods.
			this.testCases = this.buildTestCasesFromSpecs( specs );

			// I hold the results for the test (once exeuted).
			this.results = null;

		}


		// Define the instance methods.
		TestSuite.prototype = {

			// Each test case is generated using the core TestCase, the "proxy" test case (for 
			// shared test methods), and the actual methods for the given spec. All three objects
			// are combined to create the TestCase that gets executed.
			buildTestCasesFromSpecs: function( specs ) {

				var testCases = _.map(
					specs,
					function( spec ) {

						return( new TestCase( proxyTestCaseMethods, spec ) );

					}
				);

				return( testCases );

			},


			// I gather all the "test" methods from the given test case (ie, the methods that 
			// should be executed as part of the unit test). 
			getTestMethodNames: function( testCase ) {

				var methodNames = [];

				for ( var key in testCase ) {

					if ( this.isTestMethodName( key ) ) {

						methodNames.push( key );

					}

				}

				return( methodNames );

			},


			// I determine if the given method name denotes an executable test.
			isTestMethodName: function( methodName ) {

				// All test methods must start with the term, "test". 
				return( /^test/i.test( methodName ) );

			},


			// I run the given method on the given TestCase, surrounding by the appropriate
			// lifecycle methods.
			runTestMethod: function( testCase, methodName ) {

				testCase.setup();

				testCase[ methodName ]();

				testCase.teardown();

			},


			// I run the available test cases and return the results.
			runTestsCases: function() {

				this.results = new TestResults();

				try {

					for ( var i = 0, length = this.testCases.length ; i < length ; i++ ) {

						this.runTestsInTestCase( this.testCases[ i ] );

					}

					this.results.endTestingWithSuccess();

				} catch ( error ) {

					this.results.endTestingWithError( new TestError( error ) );

				}

				return( this.results );

			},


			// I run all the available tests on the given test case.
			runTestsInTestCase: function( testCase ) {

				testCase.beforeTests();

				// When running the tests, we want to stop on failure; however, we also want 
				// to make sure that we always run the after-tests teardown.
				try {			

					var testMethodNames = this.getTestMethodNames( testCase );

					for ( var i = 0, length = testMethodNames.length ; i < length ; i++ ) {

						this.results.incrementTestCount();

						this.runTestMethod( testCase, testMethodNames[ i ] );

					}
					
				// Rethrow errors - we want to prevent future tests.
				} catch( error ) {

					throw( error );

				// Guarantee that after tests run.
				} finally {
					
					testCase.afterTests();

				}

			}

		};


		return( TestSuite );

	}
);
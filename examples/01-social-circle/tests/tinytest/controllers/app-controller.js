require.tinytest.controller(
	"AppController",
	function( $scope, require, specs, TestSuite, $log, _ ) {

		// I determine the status of the testing (start, pass, fail).
		$scope.testStatus = "start";

		// I keep track of the test cases and the selected test cases.
		$scope.testCases = buildTestCaseCollection( specs );
		$scope.selectedTestCases = [];

		// I determine if test cases are currently being executed.
		$scope.isRunningTests = false;

		// I keep track of the results of the most recent test.
		$scope.testResults = null;

		// Form inputs (for ng-model bindings).
		$scope.form = {
			filter: "",
			autoRun: false
		};

		// I keep track of any errors that were raised while trying to load the test case 
		// scripts. Since error handling is a bit wonky in RequireJS (due to browser issues),
		// we can listen for uncaught errors during loading, and then check for their existence
		// within the callbacks.
		var scriptLoadingError = null;


		// ---
		// PUBLIC METHODS.
		// ---


		// I handle any uncaught errors in thrown by the loading of test case scripts.
		$scope.handleUncaughtException = function( error ) {

			scriptLoadingError = error;
			
			$log.error( error );

			// NOTE: This is not really where this should be; but, to keep things simple, we'll
			// go with an alert rather than something less DOM-oriented.
			alert( "One of your test cases failed to load (see console)." );

		};


		// I run the currently-selected test cases.
		$scope.runTests = function() {

			// If the tests are currently running, ignore the request.
			if ( $scope.isRunningTests ) {

				return;

			}

			// Gather the selected test cases.
			var testCases = updateSelectedTestCases();

			// Ignore run request if no test cases have been selected.
			if ( ! testCases.length ) {

				return;

			}

			// Reset the script-loading error. This way, we can see if new errors were generated
			// during the loading of the scripts.
			scriptLoadingError = null;

			$scope.isRunningTests = true;

			// Load and run the test cases.
			require(
				_.map(
					testCases,
					function( testCase ) {

						return( "tt_specs/" + testCase.name );

					}
				),
				function successCallback() {

					$scope.isRunningTests = false;

					// If there was a problem with the script loading, exit out of the test harness.
					if ( scriptLoadingError ) {

						return( $scope.testStatus = "start" );

					}

					var testSuite = new TestSuite( arguments );

					$scope.testResults = testSuite.runTestsCases();

					$scope.testStatus = ( $scope.testResults.isPassed() ? "pass" : "fail" );
					
				},
				function errorCallback( error ) {

					$scope.isRunningTests = false;

					$scope.handleUncaughtException( error );

				}
			);

		};


		// I select all the available test cases.
		$scope.selectAllTestCases = function() {

			for ( var i = 0 ; i < $scope.testCases.length ; i++ ) {

				$scope.testCases[ i ].isSelected = true;

			}

		};


		// ---
		// PRIVATE METHODS.
		// ---


		// I convert the list of test case names into something we can render with selectability.
		function buildTestCaseCollection( specs ) {

			var testCases = _.map(
				specs,
				function( specName ) {

					return({
						name: specName,
						isSelected: false
					});

				}
			);

			return( testCases );

		}


		// I update the collection of selected test cases (and return the collection).
		function updateSelectedTestCases() {

			$scope.selectedTestCases = _.filter(
				$scope.testCases,
				function( testCase ) {

					return( testCase.isSelected );

				}
			);

			return( $scope.selectedTestCases );

		}

	}
);
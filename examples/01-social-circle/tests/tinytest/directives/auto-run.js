require.tinytest.directive(
	"ttAutoRun",
	function( $, $window ) {

		// I bind the scope to the ui events.
		function link( $scope, element, attributes ) {

			// When the window gain's focus, check to see if the user wants to automatically
			// re-run the scripts. This assumes an ALT-TAB-driven style of coding and testing.
			$( $window ).on( 
				"focus.ttAutoRun",
				function focusEventHandler() {

					if ( ! $scope.form.autoRun ) {

						return;

					}

					$scope.runTests();

				}
			);

		}


		// Return the directive configuration.
		return({
			link: link,
			scope: false
		});

	}
);
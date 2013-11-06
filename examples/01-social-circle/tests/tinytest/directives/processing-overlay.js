require.tinytest.directive(
	"ttProcessingOverlay",
	function( $ ) {

		// I bind the scope to the ui events.
		function link( $scope, element, attributes ) {

			// Since the tests will never be running when the page loads, start with the element
			// hidden from view; this will prevent a flicker from occuring during the initial 
			// watch-configuration.
			element.hide();

			// Show and hide the overlay as the tests are run.
			$scope.$watch(
				"isRunningTests",
				function isRunningTestsWatcher( newValue, oldValue ) {

					// Ignore initial configuration of watcher.
					if ( newValue === oldValue ) {

						return;

					}

					if ( newValue ) {

						showOverlay();

					} else {

						hideOverlay();

					}

				}
			);


			// ---
			// PRIVATE METHODS.
			// ---


			// Hide the overlay.
			function hideOverlay() {

				element
					.stop( true )
					.fadeOut( 200 )
				;

			}


			// Show the overlay.
			function showOverlay() {

				// Since the fade-in/out can add visual noise on short test-runs, we don't 
				// want to show it immediately; rather, let's wait a bit to see if the tests
				// complete. If so, we won't show anything.
				element
					.delay( 500 )
					.fadeIn( 200 )
				;

			}

		}


		// Return the directive configuration.
		return({
			link: link,
			scope: false
		});

	}
);
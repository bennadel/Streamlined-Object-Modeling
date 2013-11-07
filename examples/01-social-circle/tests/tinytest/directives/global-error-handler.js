require.tinytest.directive(
	"ttGlobalErrorHandler",
	function( $window ) {

		// I bind the scope to the ui events.
		function link( $scope, element, attributes ) {

			// Catch any errors that bubble up to the root of the document. These will likely
			// be caused by errors during script-loading since all other areas of script are
			// going to be handled by AngularJS's error management.
			$window.onerror = function errorHandler( error ) {

				$scope.$apply(
					function() {

						$scope.handleUncaughtException( error );

					}
				);

			};
				
		}


		// Return the directive configuration.
		return({
			link: link,
			scope: false
		});

	}
);
require.tinytest.factory(
	"require",
	function( $rootScope ) {

		// As the test modules AND their dependencies are loaded for testing, we need to keep
		// track of them so that we can undefine them after the tests are run. This will force
		// RequireJS to re-load them every time they are needed.
		var testModules = [];


		// I get notified whenever RequireJS loads a module (directly or as a dependency). Since
		// the test harness has already loaded, this will only affect modules that are loaded as
		// a result of test running.
		// --
		// SEE: https://github.com/juanantonioruz/requirejs-force-reload/blob/master/scripts/main.js
		// -- 
		// NOTE: This is an "internal" method and is subject to change; however, since we control
		// the version of RequireJS being used, it should be safe.
		require.onResourceLoad = function( context, map, dependencyArray ) {

			testModules.push( map.name );

		};


		// I undefine / unload each of the modules loaded during testing.
		function clearTestModuleCache() {

			for ( var i = ( testModules.length - 1 ) ; i >= 0 ; i-- ) {

				require.undef( testModules.pop() );

			}

		}


		// Since the callbacks in the RequireJS module will take the control-flow outside 
		// of the normal AngularJS context, we need to create a proxy that will automatically
		// alert AngularJS to the execution of the callback. Plus, this gives us an opportunity
		// to add some error handling.
		function requireProxy( dependencies, successCallback, errorCallback ) {

			// Make sure the callbacks are defined - this makes the logic easier down below.
			successCallback = ( successCallback || angular.noop );
			errorCallback = ( errorCallback || angular.noop );

			// NOTE: This "require" reference is the core, global reference.
			require(
				( dependencies || [] ),
				function successCallbackProxy() {

					var args = arguments;

					$rootScope.$apply(
						function() {

							successCallback.apply( this, args );

							// At this point, the tests have run - clear cached modules.
							clearTestModuleCache();

						}
					);

				},
				function errorCallbackProxy() {

					var args = arguments;

					$rootScope.$apply(
						function() {

							errorCallback.apply( this, args );

							// Not all tests loaded properly - clear whichever modules have 
							// been cached.
							clearTestModuleCache();

						}
					);

				}
			);

		}


		return( requireProxy );

	}
);
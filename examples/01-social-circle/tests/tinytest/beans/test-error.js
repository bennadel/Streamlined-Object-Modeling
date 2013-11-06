require.tinytest.factory(
	"TestError",
	function( stacktraceService ) {

		// I initialize the test error with the given exception.
		function TestError( exception ) {

			this.errorMessage = this.getErrorMessageFromException( exception );

			// I am the stacktrace extracted directly from the exception object.
			this.fullStackTrace = this.getFullStackTraceFromException( exception );

			// I am the normalized stacktrace meant for output usage.
			this.stackTrace = this.getNormalizedStackTrace( this.fullStackTrace );

		}


		// Define the instance methods.
		TestError.prototype = {

			// I return the error message associated with the error.
			getErrorMessage: function() {

				return( this.errorMessage );

			},


			// I get the error message from the given error object.
			getErrorMessageFromException: function( exception ) {

				return( exception.message );

			},


			// I return the full stacktrace.
			getFullStackTrace: function() {

				return( this.fullStackTrace );

			},


			// I get the file name from the given file path.
			getFileNameFromPath: function( path ) {

				var matches = path.match( /[^\/]+$/i );

				if ( ! matches ) {

					return( "" );

				}

				return( matches[ 0 ] );

			},


			// I get the file path from the given stacktrace item. Note that this stacktrace item is
			// not consistent in its format across all browsers (looking at you, IE!).
			getFilePathFromStackTraceItem: function( item ) {

				var matches = item.match( /:\/\/[^\/]+(\/.+?\.js)/i );

				// Some browsers don't report the stacktrace very well (IE9 for example). In those cases,
				// just use the raw stack item as the file path.
				if ( ! matches ) {

					return( item );

				}

				return( matches[ 1 ] );

			},


			// I get the stacktrace provided by the given exception. Return an array of items.
			getFullStackTraceFromException: function( exception ) {
				
				return( stacktraceService.getStackTrace( exception ) );

			},


			// I get the line number from the given stacktrace item. Note that this stacktrace item is
			// not consistent in its format across all browsers, even modern browsers.
			getLineNumberFromStackTraceItem: function( item ) {

				// Some browsers report [:line:char] where as some browsers report only [:line]. As
				// such, we have to make the character offset an optional tail group.
				var matches = item.match( /(:(\d+))(:\d+)?$/i );

				if ( ! matches ) {

					return( -1 );

				}

				return( matches[ 2 ] );

			},


			// I normalize the raw stacktrace into a structure with a predictable format.
			getNormalizedStackTrace: function( rawStacktrace ) {

				var normalizedStackTrace = [];

				for ( var i = 0, length = rawStacktrace.length ; i < length ; i++ ) {

					var rawItem = rawStacktrace[ i ];

					// Exclude any items that will only add noise to the stacktrace (such as those 
					// internal to the test harness).
					if ( this.shouldExcludeStackTraceItem( rawItem ) ) {

						continue;

					}

					var filePath = this.getFilePathFromStackTraceItem( rawItem );
					var fileName = ( this.getFileNameFromPath( filePath ) || filePath );
					var lineNumber = this.getLineNumberFromStackTraceItem( rawItem );

					normalizedStackTrace.push({
						rawItem: rawItem,
						fileName: fileName,
						filePath: filePath,
						lineNumber: lineNumber
					});

				}

				return( normalizedStackTrace );

			},


			// I return the normalized stacktrace.
			getStackTrace: function() {

				return( this.stackTrace );

			},


			// I determine if the given stacktrace item should be excluded from the normalized 
			// stacktrace as it will only add noise and no investigatory information.
			shouldExcludeStackTraceItem: function( path ) {

				// Exclude any stacktrace items inside the test harness.
				return( /\/tinytest\/(beans|controllers|directives|services|vendor)/i.test( path ) );

			}

		};


		return( TestError );

	}
);
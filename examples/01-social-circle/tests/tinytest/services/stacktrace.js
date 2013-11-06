require.tinytest.factory(
	"stacktraceService",
	function( printStackTrace ) {

		// Since stacktrace.js exposes a single, gobal method, I just like to wrap it up in
		// something that feels a bit more contained. In this case, we're returning an object
		// that wraps the stacktrace access.
		return({
			getStackTrace: function( exception ) {

				return(
					printStackTrace({ e: exception }) 
				);

			}			
		});

	}
);
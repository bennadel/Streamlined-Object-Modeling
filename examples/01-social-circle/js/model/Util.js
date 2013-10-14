define(
	[ "lodash" ],
	function( _ ) {

		// The util class extends the lodash library and adds new utility methods.
		var util = Object.create( _ );


		// I determine how much sooner the ealier date is than the later date.
		util.dateDiff = function( datePart, earlierDate, laterDate ) {

			// Difference in Years.
			if ( datePart === "Y" ) {

				return( laterDate.getFullYear() - earlierDate.getFullYear() );

			}

			throw( new Error( "Date part not supported: [ " + datePart + " ]." ) );

		};


		// I remove the leading and trailing whitespace from the given string value.
		util.trim = function( value ) {

			return(
				( value || "" ).replace( /^\s+|\s+$/g, "" )
			);

		};


		// Return the module definition.
		return( util );

	}
);
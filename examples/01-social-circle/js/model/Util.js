define(
	[ "lodash" ],
	function( _ ) {

		// The util class extends the lodash library and adds new utility methods.
		var util = Object.create( _ );


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
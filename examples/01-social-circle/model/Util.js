define(
	[ "lodash" ],
	function( _ ) {

		// The util class extends the lodash library and adds new utility methods.
		var util = Object.create( _ );


		// I return true if any of the items .equals() the given item.
		util.anyEquals = function( collection, item ) {

			for ( var i = 0, length = collection.length ; i < length ; i++ ) {

				if ( collection[ i ].equals( item ) ) {

					return( true );

				}

			}

			return( false );

		};


		// I filter out any items that .equals() the given item.
		util.withoutEquals = function( collection, item ) {

			var filtered = util.reject(
				collection,
				function( currentItem ) {

					return( currentItem.equals( item ) );

				}
			);

			return( filtered );

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
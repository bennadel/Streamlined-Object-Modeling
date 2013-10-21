define(
	[ "lodash", "printStackTrace" ],
	function( _, printStackTrace ) {

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


		// I am a short-hand for assertTrue().
		util.assert = function( truthy ) {

			util.assertTrue( truthy );

		};


		// I assert that the given value is falsey.
		util.assertFalse = function( falsey ) {

			if ( falsey == true ) {

				console.info( "Given value:", falsey );

				throw( new Error( "Expected falsey." ) );

			}

		};


		// I throw a test error - used to make sure a part of the code is not run.
		util.assertFail = function( callback ) {

			try {

				callback( util.assertTrue, util.assertFalse, util.assertFail );

			} catch ( error ) {

				return;

			}

			throw( new Error( "Expected failure." ) );

		};


		// I assert that the given value is truthy.
		util.assertTrue = function( truthy ) {

			if ( truthy == false ) {

				console.info( "Given value:", truthy );

				throw( new Error( "Expected truthy." ) );

			}

		};


		// I get the stacktrace from the given error.
		util.getStacktrace = function( error ) {

			return( printStackTrace( error ) );

		};


		// I run the given unit test.
		util.test = function( callback ) {

			try {

				callback( util.assertTrue, util.assertFalse, util.assertFail );

			} catch ( error ) {

				console.error( error );
				
				// var stacktrace = util.getStacktrace({ e: error });
				// console.error( stacktrace.join( "\n" ) );
				
			}

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
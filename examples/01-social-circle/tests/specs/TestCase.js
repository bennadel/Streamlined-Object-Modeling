// You can add custom assertion methods (or any other shared methods) that you want made 
// availble to all of your test specifications. The goal of any assert method should be 
// to return on success; or, to call this.fail() if the assert has failed.
// --
// NOTE: this.fail() will raise an exception and halt processing.
define({

	// I [loosely] assert that the given value is a valid email address.
	assertIsValidEmail: function( email ) {

		if ( ! /[^@]+@[^.]+(\.[^.]+)+/i.test( email ) ) {

			this.fail( "Expected [" + this.stringify( email ) + "] to be a valid email address." );

		}

	}

});
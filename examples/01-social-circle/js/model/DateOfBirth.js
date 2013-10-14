define(
	[ "Util" ],
	function( util ) {

		// I represent a date of birth.
		function DateOfBirth( aDate ) {

			this.setDate( aDate );
			
		}


		// Define the instance methods.
		DateOfBirth.prototype = {

			// I set the date any validation.
			doSetDate: function( newDate ) {

				this.date = newDate;

			},


			// I return the age (in years).
			getAge: function() {

				return( util.dateDiff( "Y", this.date, new Date() ) );

			},


			// I return the date property.
			getDate: function() {

				return( this.date );

			},


			// I determine if the date of birth is older than the given years. This calculation 
			// is INCLUSIVE of the given age.
			isOlderThan: function( ageInYears ) {

				return( this.getAge() >= ageInYears );

			},


			// I determien if the date of birth is younger than the given years. This calculation
			// is EXLCUSIVE of the given age.
			isYoungerThan: function( ageInYears ) {

				return( this.getAge() < ageInYears );

			},


			// I set the date (with validation constraints).
			setDate: function( newDate ) {

				if ( ! ( newDate instanceof Date ) ) {

					newDate = new Date( newDate );

				}

				if ( isNaN( newDate.getTime() ) ) {

					throw( new Error( "Date is not a valid date." ) );

				}

				this.testSetDate( newDate );
				this.doSetDate( newDate );

				return( this );

			},


			// I test to make sure the given date can be set.
			testSetDate: function( newDate ) {

				if ( newDate > new Date() ) {

					throw( new Error( "Attempt to bend the space-time continuum." ) );

				}

			}

		};


		// Return the module definition.
		return( DateOfBirth );

	}
);
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


			// I determine if the current date of birth equals the given date of birth.
			equals: function( aDateOfBirth ) {

				return( this.date.getTime() === aDateOfBirth.getDate().getTime() );

			},


			// I return the age (in years).
			getAge: function() {

				var now = new Date();

				return( now.getFullYear() - this.date.getFullYear() );

			},


			// I return the date property.
			getDate: function() {

				return( this.date );

			},


			// I determine if the calculated age is equal to the given age (in years).
			isAgeEQ: function( ageInYears ) {

				return( this.getAge() === ageInYears );

			},

			
			// I determine if the calculated age is greater-than the given age (in years).
			isAgeGT: function( ageInYears ) {

				return( this.getAge() > ageInYears );

			},


			// I determine if the calculated age is greater-than or equal-to the given age (in years).
			isAgeGTE: function( ageInYears ) {

				return( this.getAge() >= ageInYears );

			},


			// I determine if the calculated age is less-than the given age (in years).
			isAgeLT: function( ageInYears ) {

				return( this.getAge() < ageInYears );

			},


			// I determine if the calculated age is less-than or equal-to the given age (in years).
			isAgeLTE: function( ageInYears ) {

				return( this.getAge() >= ageInYears );

			},


			// I set the date (with validation constraints). The date can be an actual Date object;
			// or it can be a prasable date string.
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
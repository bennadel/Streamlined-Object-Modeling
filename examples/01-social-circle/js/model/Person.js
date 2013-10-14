define(
	[ "Util" ],
	function( util ) {

		// I represent a "generic" person.
		function Person( aName, aGender, aDateOfBirth ) {

			this.setName( aName );
			this.setGender( aGender );
			this.setDateOfBirth( aDateOfBirth );

		}


		// Define the instance methods.
		Person.prototype = {

			// I set the date of birth without any validation.
			doSetDateOfBirth: function( newDateOfBirth ) {

				this.dateOfBirth = newDateOfBirth;

			},


			// I set the gender without any validation.
			doSetGender: function( newGender ) {

				this.gender = newGender;

			},


			// I set the name value without any validation.
			doSetName: function( newName ) {

				this.name = newName;

			},


			// I return the date of birth property.
			getDateOfBirth: function() {

				return( this.dateOfBirth );

			},


			// I return the gender property.
			getGender: function() {

				return( this.gender );

			},


			// I return the name property.
			getName: function() {

				return( this.name );

			},


			// I determine if the person is female.
			isFemale: function() {

				return( this.gender === "F" );

			},


			// I determine if the person is male.
			isMale: function() {

				return( this.gender === "M" );

			},


			// I set the date of birth (with validation constraints).
			setDateOfBirth: function( newDateOfBirth ) {

				if ( ! ( newDateOfBirth instanceof Date ) ) {

					newDateOfBirth = new Date( newDateOfBirth );

				}

				if ( isNaN( newDateOfBirth.getTime() ) ) {

					throw( new Error( "Date of Birth is not a date." ) );

				}

				this.testSetDateOfBirth( newDateOfBirth );
				this.doSetDateOfBirth( newDateOfBirth );

				return( this );

			},


			// I set the gender (with validation constraints).
			setGender: function( newGender ) {

				newGender = util.trim( newGender );

				if ( ! newGender.length ) {

					throw( new Error( "Gender is null." ) );

				}

				this.testSetGender( newGender );
				this.doSetGender( newGender );

				return( this );

			},


			// I set the name (with validation constraints).
			setName: function( newName ) {

				newName = util.trim( newName );

				if ( ! newName.length ) {

					throw( new Error( "Name is null." ) );

				}

				this.testSetName( newName );
				this.doSetName( newName );

				return( this );

			},


			// I test to make sure the given date of birth can be set.
			testSetDateOfBirth: function( newDateOfBirth ) {

				var now = new Date();

				if ( newDateOfBirth > now ) {

					throw( new Error( "Attempt to bend the space-time continuum." ) );

				}

				if ( util.dateDiff( "Y", newDateOfBirth, now ) > 120 ) {

					throw( new Error( "Age is not valid." ) );

				}

			},


			// I test to make sure the given gender can be set.
			testSetGender: function( newGender ) {

				if ( ( newGender !== "M" ) && ( newGender !== "F" ) ) {

					throw( new Error( "Gender selection is not supported." ) );

				}

				if ( this.gender ) {

					throw( new Error( "Gender reassignment not currently implemented." ) );

				}

			},


			// I test to make sure the given name can be set.
			testSetName: function( newName ) {

				if ( /[^a-z'.\s-]/i.test( newName ) ) {

					throw( new Error( "Name contains invalid characters." ) );

				}

			}

		};


		// Return the module definition.
		return( Person );

	}
);
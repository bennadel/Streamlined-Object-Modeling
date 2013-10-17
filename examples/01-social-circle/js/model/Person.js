define(
	[ "Util" ],
	function( util ) {

		// I represent a "generic" person.
		function Person( aName, aGender, aDateOfBirth ) {

			this.setName( aName );
			this.setGender( aGender );
			this.setDateOfBirth( aDateOfBirth );

			// Since a person can exist without attractions, we'll defer the populating of the 
			// attractions collection until after instantiation.
			this.attractions = [];

		}


		// Define the instance methods.
		Person.prototype = {

			// I add the given attraction.
			addAttraction: function( newPerson ) {

				if ( ! newPerson ) {

					throw( new Error( "Person is null." ) );

				}

				this.testAddAttraction( newPerson );
				this.doAddAttraction( newPerson );

			},


			// I add the given attraction without any validation.
			doAddAttraction: function( aPerson ) {

				this.attractions.push( aPerson );

			},


			// I dissolve the attraction to the given person without any validation.
			doRemoveAttraction: function( aPerson ) {

				for ( var i = 0, length = this.attractions.length ; i < length ; i++ ) {

					if ( this.attractions[ i ].equals( aPerson ) ) {

						this.attractions.splice( i, 1 );
						return;

					}

				}

			},


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


			// I determine if this person is equal to the given instance.
			equals: function( aPerson ) {

				if ( ! aPerson ) {

					return( false );

				}

				return(
					( this.name === aPerson.getName() ) &&
					( this.gender === aPerson.getGender() ) &&
					this.dateOfBirth.equals( aPerson.getDateOfBirth() )
				);

			},


			// I return the collection of current attractions.
			getAttractions: function() {

				// NOTE: Using slice() here so the underlying array cannot be mutated without
				// going through the proper channels. 
				return( this.attractions.slice() );

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


			// I determine if the person already has an attraction to the given person.
			isAttractedTo: function( aPerson ) {

				for ( var i = 0 ; i < this.attractions.length ; i++ ) {

					if ( this.attractions[ i ].equals( aPerson ) ) {

						return( true );

					}

				}

				return( false );

			},


			// I determine if the person is female.
			isFemale: function() {

				return( this.gender === "F" );

			},


			// I determine if the person is male.
			isMale: function() {

				return( this.gender === "M" );

			},


			// I dissolve the attraction to the given person.
			removeAttraction: function( aPerson ) {

				if ( ! aPerson ) {

					throw( new Error( "Person is null." ) );

				}

				this.testRemoveAttraction( aPerson );
				this.doRemoveAttraction( aPerson );

			},


			// I set the date of birth (with validation constraints).
			setDateOfBirth: function( newDateOfBirth ) {

				if ( ! newDateOfBirth ) {

					throw( new Error( "Date of Birth is null." ) );
					
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


			// I test to make sure the given person can be added as an attraction.
			testAddAttraction: function( newPerson ) {

				if ( this.equals( newPerson ) ) {

					throw( new Error( "Narcissist." ) );

				}

				if ( this.isAttractedTo( newPerson ) ) {

					throw( new Error( "Attraction already exists." ) );

				}

			},


			// I test to make sure the attraction to the given person can be dissolved.
			testRemoveAttraction: function( aPerson ) {

				// There's no point in testing to make sure the person is actually an attraction -
				// trying to remove an attaction that doesn't exist will not throw an error.

			},


			// I test to make sure the given date of birth can be set.
			testSetDateOfBirth: function( newDateOfBirth ) {

				if ( newDateOfBirth.isAgeGT( 120 ) ) {

					throw( new Error( "Age is not valid." ) );

				}

			},


			// I test to make sure the given gender can be set.
			testSetGender: function( newGender ) {

				if ( ( newGender !== "M" ) && ( newGender !== "F" ) ) {

					throw( new Error( "Gender definition is not supported." ) );

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
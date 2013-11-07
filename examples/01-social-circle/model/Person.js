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

			// Since a person can exist without social circles, we'll defer the populating of the
			// social circles collection until after instantiation.
			this.socialCircles = [];

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


			// I add the given social circle.
			addSocialCircle: function( newSocialCircle ) {

				if ( ! newSocialCircle ) {

					throw( new Error( "Social Circle is null." ) );

				}

				this.testAddSocialCircle( newSocialCircle );
				this.doAddSocialCircle( newSocialCircle );
				newSocialCircle.doAddPerson( this );

			},


			// I add the given attraction without any validation.
			doAddAttraction: function( newPerson ) {

				this.attractions.push( newPerson );

			},


			// I add the given social circle without any validation.
			doAddSocialCircle: function( newSocialCircle ) {

				this.socialCircles.push( newSocialCircle );

			},


			// I dissolve the attraction to the given person without any validation.
			doRemoveAttraction: function( aPerson ) {

				this.attractions = util.withoutEquals( this.attractions, aPerson );

			},


			// I dissolve the social circle membership without any validation.
			doRemoveSocialCircle: function( aSocialCircle ) {

				this.socialCircles = util.withoutEquals( this.socialCircles, aSocialCircle );

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


			// I return the age (in years).
			getAge: function() {

				return( this.dateOfBirth.getAge() );

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

				return( util.anyEquals( this.attractions, aPerson ) );

			},


			// I determine if the person is female.
			isFemale: function() {

				return( this.gender === "F" );

			},


			// I determine if this person is part of the given social circle.
			isInSocialCircle: function( aSocialCircle ) {

				return( util.anyEquals( this.socialCircles, aSocialCircle ) );

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


			// I add the given social circle.
			removeSocialCircle: function( aSocialCircle ) {

				if ( ! aSocialCircle ) {

					throw( new Error( "Social Circle is null." ) );

				}

				this.testRemoveSocialCircle( aSocialCircle );
				this.doRemoveSocialCircle( aSocialCircle );
				aSocialCircle.doRemovePerson( this );

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

				// Since attractions play an integral role in the way that social circles are 
				// constrained, we have to check with the social circle before we can create
				// a new attraction.
				for ( var i = 0, length = this.socialCircles.length ; i < length ; i++ ) {

					this.socialCircles[ i ].testAddPersonAttractionConflict( this, newPerson );

				}

			},


			// I test to make sure the given social circle can be added.
			testAddSocialCircle: function( newSocialCircle ) {

				if ( this.isInSocialCircle( newSocialCircle ) ) {

					throw( new Error( "Person is already in Social Circle." ) );

				}

				newSocialCircle.testAddPerson( this );

			},


			// I test to make sure the attraction to the given person can be dissolved.
			testRemoveAttraction: function( aPerson ) {

				// There's no point in testing to make sure the person is actually an attraction -
				// trying to remove an attaction that doesn't exist will not throw an error.

			},


			// I test to make sure the social circle relationship can be dissolved.
			testRemoveSocialCircle: function( aSocialCircle ) {

				if ( ! this.isInSocialCircle( aSocialCircle ) ) {

					return;

				}

				aSocialCircle.testRemovePerson( this );

			},


			// I test to make sure the given date of birth can be set.
			testSetDateOfBirth: function( newDateOfBirth ) {

				if ( this.dateOfBirth ) {

					throw( new Error( "Date of Birth cannot be changed - this is not Witness Protection." ) );

				}

				if ( newDateOfBirth.isAgeGT( 120 ) ) {

					throw( new Error( "Date of Birth is not valid." ) );

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
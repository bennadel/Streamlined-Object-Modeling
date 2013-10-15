define(
	[ "Util" ],
	function( util ) {

		// I represent a "generic" person.
		function Person( aID, aName, aGender, aDateOfBirth ) {

			this.setID( aID );
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
			addAttraction: function( aAttraction ) {

				if ( ! aAttraction ) {

					throw( new Error( "Attraction is null." ) );

				}

				// Defer to the attraction instance to coordinate the relationship. I *believe* that
				// this is an instance of "whole delegates to part", since this attraction is just 
				// one in the collection of attractions? Not really sure.
				aAttraction.addPerson( this );

			},


			// I add the given attraction without any validation.
			doAddAttraction: function( newAttraction ) {

				this.attractions.push( newAttraction );

			},


			// I set the date of birth without any validation.
			doSetDateOfBirth: function( newDateOfBirth ) {

				this.dateOfBirth = newDateOfBirth;

			},


			// I set the gender without any validation.
			doSetGender: function( newGender ) {

				this.gender = newGender;

			},


			// I set the ID without any validation.
			doSetID: function( newID ) {

				this.id = newID;

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

				// Since data persistence requires these objects to have a unique ID, if they
				// have not yet been persisted, we can't really compare them properly. Default
				// to simply checking object references.
				if ( ! ( this.id && aPerson.getID() ) ) {

					return( this === aPerson );

				}

				return( this.id === aPerson.getID() );

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

					if ( this.attractions[ i ].targets( aPerson ) ) {

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


			// I set the ID (with validation constraints).
			setID: function( newID ) {

				newID = ( newID || 0 );

				this.testSetID( newID );
				this.doSetID( newID );

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


			// I test to make sure the given ID can be set.
			testSetID: function( newID ) {

				if ( this.id ) {

					throw( new Error( "ID cannot be changed once it is set" ) );

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
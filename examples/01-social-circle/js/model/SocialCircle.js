define(
	[ "util" ],
	function( util ) {

		// I represent a "collection" of people.
		function SocialCircle() {

			// Since the social circle can exist (I think) without people, we will defer the 
			// population of the people until after construction. 
			this.persons = [];

			// According to Dunbar's number, a social group can only maintain its effectiveness
			// (ie, meaningful interperson relationships) if it is less than 150 people.
			this.maxPersonsCount = 150;

			// In order to avoid awkwardness, the gender ratio within the Social Circle cannot
			// drop below the given ratio. This is true for M:F and F:M.
			this.minimumGenderRatio = 1 / 4;

		}


		// Define the instance methods.
		SocialCircle.prototype = {

			// I add the given person to the social circle.
			addPerson: function( aPerson ) {

				if ( ! aPerson ) {

					throw( new Error( "Person is null." ) );

				}

				// Defer the coordination of the "add" to the person. When streamlining the bi-
				// directional, the whole defers to part (or in this case, the Group defers to 
				// the Member to coordinate).
				aPerson.addSocialCircle( this );

			},


			// I add the given person (without any validation).
			doAddPerson: function( newPerson ) {

				this.persons.push( newPerson );

			},


			// I detemine if this social circle equals the given social circle.
			equals: function( aSocialCircle ) {

				// Since the social circle doesn't have any unique identifier, we have no choice 
				// but to fall back to actual object reference checks.
				return( this === aSocialCircle );

			},


			// I return the number of women in the social circle.
			getFemaleCount: function() {

				var count = 0;

				for ( var i = 0, length = this.persons.length ; i < length ; i++ ) {

					if ( this.persons[ i ].isFemale() ) {

						count++;

					}

				}

				return( count );

			},


			// I return the number of men in the social circle.
			getMaleCount: function() {

				var count = 0;

				for ( var i = 0, length = this.persons.length ; i < length ; i++ ) {

					if ( this.persons[ i ].isMale() ) {

						count++;

					}

				}

				return( count );

			},


			// I return the collection of people in the social circle.
			getPersons: function() {

				// Use slice to make sure the "internal" collection cannot be altered.
				return( this.persons.slice() );

			},


			// I determine if the social circle contains the given person.
			hasPerson: function( aPerson ) {

				return( util.anyEquals( this.persons, aPerson ) );

			},


			// I determine if the social circle is currently at capacity (ie, is full).

			isAtCapacity: function() {

				return( this.persons.length === this.maxPersonsCount );

			},


			// I test to see if forming a uni-directional attraction between the given person and
			// the given target would create a love-triangle.
			testAddPersonAttractionConflict: function( aPerson, newAttraction ) {

				for ( var i = 0, length = this.persons.length ; i < length ; i++ ) {

					var trianglePerson = this.persons[ i ];

					if ( trianglePerson.equals( aPerson ) || trianglePerson.equals( newAttraction ) ) {

						continue;

					}

					if ( newAttraction.isAttractedTo( trianglePerson ) ) {

						throw( new Error( "Attraction would create a love triangle." ) );

					}

				}

			},


			// I test to see if the given person can be added as a new Person in the social circle.
			testAddPersonConflict: function( newPerson ) {

				if ( newPerson.getAge() < 18 ) {

					throw( new Error( "Person must be at least 18 years old." ) );

				}

				if ( this.hasPerson( newPerson ) ) {

					throw( new Error( "Person is already in Social Circle." ) );

				}

				if ( this.isAtCapacity() ) {

					throw( new Error( "Social Circle cannot accept any additional Persons." ) );

				}

				// Gender ratio test.

				var maleCount = this.getMaleCount();
				var femaleCount = this.getFemaleCount();

				if ( newPerson.isMale() ) {

					maleCount++;

				} else {

					femaleCount++;

				}

				// The ratio check only matters if we have BOTH men and women. A single-gender group
				// has no problem.
				if ( maleCount && femaleCount ) {

					var smallestGenderRatio = Math.min( ( maleCount / femaleCount ), ( femaleCount / maleCount ) );

					if ( smallestGenderRatio < this.minimumGenderRatio ) {

						throw( new Error( "Person would violate minimum gender ratio." ) );

					}

				}

				// Love triangle test.

				// For each person in the group, check to see if the NEW person is attracted to them.
				for ( var i = 0 ; i < this.persons.length ; i++ ) {

					var targetPerson = this.persons[ i ];

					if ( newPerson.isAttractedTo( targetPerson ) ) {

						// The NEW person is attracted to the given person. For eacn person in the 
						// group, we need to see if a further attraction is owned by the target.
						for ( var t = 0 ; t < this.persons.length ; t++ ) {

							var trianglePerson = this.persons[ t ];

							if ( targetPerson.isAttractedTo( trianglePerson ) ) {

								throw( new Error( "Person would create a love triangle." ) );

							}

						}

					}

				}

			}

		};


		// Return the module definition.
		return( SocialCircle );

	}
);
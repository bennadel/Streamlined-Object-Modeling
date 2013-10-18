define(
	[ "util" ],
	function( util ) {

		// I represent a "specific" person in a given social circle. This is a "context" in which
		// the person perform actions.
		function Friend( aPerson, aSocialCircle ) {

			this.addPerson( aPerson );
			
			// Because this object collaborates with multiple objects, we might have a partial 
			// failure. If so, we have to rollback the relationships that worked.
			try {

				this.addSocialCircle( aSocialCircle );

			} catch ( error ) {

				// TODO: Rollback the Person-Friend (ie, Actor-Role) relationship.
				// this.person.doRemoveFriend( this );

			}

		}


		// Define the instance methods.
		Friend.prototype = {

			// I add the given person.
			addPerson: function( newPerson ) {

				if ( ! newPerson ) {

					throw( new Error( "Person is null." ) );

				}

				this.testAddPerson( newPerson );
				this.doAddPerson( newPerson );

				// TODO: Establish the bi-directional relationship.
				// newPerson.doAddFriend( this );

			},


			// I add the given social circle.
			addSocialCircle: function( newSocialCircle ) {

				if ( ! newSocialCircle ) {

					throw( new Error( "Social Circle is null." ) );

				}

				this.testAddSocialCircle( newSocialCircle );
				this.doAddSocialCircle( newSocialCircle );
				newSocialCircle.doAddFriend( this );

			},


			// I add the given person without any validation.
			doAddPerson: function( newPerson ) {

				this.person = newPerson;

			},


			// I add the given social circle without any validation.
			doAddSocialCircle: function( newSocialCircle ) {

				this.socialCircle = newSocialCircle;

			},


			// I test to make sure the given person can be added.
			testAddPerson: function( newPerson ) {

				if ( this.person ) {

					throw( new Error( "Person cannot be changed." ) );

				}

				// NOTE: We do not have to check with the Person for validation of the role.
				// The Social-Cirlce test (below) will handle this implicitly. Since you cannot
				// be part of a social circle twice at the same time, we know that the Person
				// doesn't have the "Friend" role in the given Social Circle context.

				// If the social circle has already been set, we can test against it.
				// --
				// NOTE: We know that this method will *really* only ever be called before the
				// social circle has been set (in the constructor); however, that creates a 
				// connaissance-of-time problem in which the developer has to make sure never to 
				// change the order of the calls. We can get around this by adding this simple, 
				// bi-directional check.
				if ( this.socialCircle ) {

					// When it comes to Social-Circle validation, it's more complex that simply,
					// "does this friend already exist." As such, we have to defere the entirety
					// of the new person validation to the social circle.
					this.socialCircle.testAddPersonConflict( newPerson );

				}

			},


			// I test to make sure the given social circle can be added.
			testAddSocialCircle: function( newSocialCircle ) {

				if ( this.socialCircle ) {

					throw( new Error( "Social Circle cannot be changed." ) );

				}

				// If the person has already been set, we can test against it.
				// --
				// NOTE: We know that this method will *really* only ever be called after the
				// person has been set (in the constructor); however, that creates a connaissance-
				// of-time problem in which the developer has to make sure never to change the order
				// of the calls. We can get around this by adding this simple, bi-directional check.
				if ( this.person ) {

					newSocialCircle.testAddPersonConflict( this.person );

				}

			}

		};


		// Return the module definition.
		return( Friend );

	}
);
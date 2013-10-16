define(
	[ "util" ],
	function( util ) {

		// I represent a uni-directional atraction (ie, a crush) from one person towards 
		// another person.
		function Attraction( aOwner, aTarget ) {

			this.addOwner( aOwner );
			this.addTarget( aTarget );

		}


		// Define the instance methods.
		Attraction.prototype = {

			// I add the owner collaborator.
			addOwner: function( newOwner ) {

				if ( ! newOwner ) {

					throw( new Error( "Owner is null." ) );

				}

				this.testAddOwner( newOwner );
				this.doAddOwner( newOwner );
				newOwner.doAddAttraction( this );

			},


			// I add the target collaborator.
			addTarget: function( newTarget ) {

				if ( ! newTarget ) {

					throw( new Error( "Target is null." ) );

				}

				this.testAddTarget( newTarget );
				this.doAddTarget( newTarget );

			},


			// I add the owner collaborator (without any validation).
			doAddOwner: function( newOwner ) {

				this.owner = newOwner;

			},


			// I add the target collaborator (without any validation).
			doAddTarget: function( newTarget ) {

				this.target = newTarget;

			},


			// I determine if this attraction equals the given attraction.
			equals: function( aAttraction ) {

				return(
					this.owner.equals( aAttraction.getOwner() ) &&
					this.target.equals( aAttraction.getTarget() )
				);

			},


			// I return the current owner.
			getOwner: function() {

				return( this.owner );

			},


			// I return the current target.
			getTarget: function() {

				return( this.target );

			},


			// I determine if the current attraction is owned by the given person.
			isOwnedBy: function( aPerson ) {

				return( this.owner.equals( aPerson ) );

			},


			// Determine if this attraction targets the given person.
			targets: function( aPerson ) {

				return( this.target.equals( aPerson ) );

			},


			// I test to make sure the given owner can be added.
			testAddOwner: function( newOwner ) {

				if ( this.owner ) {

					throw( new Error( "Owner cannot be changed." ) );

				}

				// If the target has already been set, we can test against it.
				if ( this.target ) {

					if ( this.target.equals( newOwner ) ) {

						throw( new Error( "Narcissist." ) );

					}

					if ( newOwner.isAttractedTo( this.target ) ) {

						throw( new Error( "Attraction already exists." ) );

					}

				}

			},


			// I test to make sure the given target can be added.
			testAddTarget: function( newTarget ) {

				if ( this.target ) {

					throw( new Error( "Target cannot be changed." ) );

				}

				// If the owner has already been set, we can test against it.
				// --
				// NOTE: We know that this method will *really* only ever be called once the
				// owner has been called; however, that creates a connaissance-of-time problem
				// in which the developer has to make sure never to change the order of the calls.
				// We can get around this by adding this simple, bi-directional check.
				if ( this.owner ) {

					if ( this.owner.equals( newTarget ) ) {

						throw( new Error( "Narcissist." ) );

					}

				}

			}

		};


		// Return the module definition.
		return( Attraction );

	}
);
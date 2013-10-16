define(
	[ "util" ],
	function( util ) {

		// I represent a "collection" of friends.
		function SocialCircle() {

			// Since the social circle can exist (I think) without friends, we will defer
			// the population of the friends until after construction. 
			this.friends = [];

		}


		// Define the instance methods.
		SocialCircle.prototype = {

			// I add the given friend to the social circle.
			addFriend: function( aFriend ) {

				if ( ! aFriend ) {

					throw( new Error( "Friend is null." ) );

				}

				// Defer the coordination of the "add" to the friend. When streamlining the bi-
				// directional, the whole defers to part.
				aFriend.addSocialCircle( this );

			},


			// I add the given friend (without any validation).
			doAddFriend: function( newFriend ) {

				this.friends.push( newFriend );

			},


			// I return the collection of friends in the social circle.
			getFriends: function() {

				// Use slice to make sure the "internal" collection cannot be altered.
				return( this.friends.slice() );

			},


			// I test to see if the given person can be added as a new Friend in the social circle.
			testAddPersonConflict: function( aPerson ) {

				// Test: Is the person old enough (>18 years).
				// Test: Does the person already exist in the social circle?
				// Test: Would this bring us over 150 friends?
				// Test: Would the gender ratio be violated?
				// Test: Would a love-triangle be created?

				// THOUGHT: This last test - love triangle - requires that the person's Attractions
				// be defined *before* they are added to the social circle. To get around this 
				// contstraint, it means that when an attraction is created for a Person, the Person
				// has to check all their EXISTING social circles.

			}

		};


		// Return the module definition.
		return( SocialCircle );

	}
);
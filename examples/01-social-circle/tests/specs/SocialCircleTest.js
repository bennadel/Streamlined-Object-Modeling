define(
	[
		"DateOfBirth",
		"Person",
		"SocialCircle"
	],
	function( DateOfBirth, Person, SocialCircle ) {

		return({

			testSocialCircle: function() {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var kit = new Person( "Kit Smith", "F", new DateOfBirth( "1982/10/14" ) );
				var socialCircle = new SocialCircle();

				socialCircle.addPerson( sarah );
				socialCircle.addPerson( arnold );

				this.assertTrue( socialCircle.hasPerson( sarah ) );
				this.assertTrue( socialCircle.hasPerson( arnold ) );
				this.assertTrue( sarah.isInSocialCircle( socialCircle ) );
				this.assertTrue( arnold.isInSocialCircle( socialCircle ) );
				this.assertFalse( socialCircle.hasPerson( kit ) );
				this.assertFalse( kit.isInSocialCircle( socialCircle ) );


				socialCircle.removePerson( sarah );

				this.assertFalse( sarah.isInSocialCircle( socialCircle ) );
				this.assertFalse( socialCircle.hasPerson( sarah ) );
				this.assertTrue( arnold.isInSocialCircle( socialCircle ) );
				this.assertTrue( socialCircle.hasPerson( arnold ) );


			},


			testGenderRatio: function() {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var tricia = new Person( "Tricia Smith", "F", new DateOfBirth( "1981/03/10" ) );
				var joanna = new Person( "Joanna Smith", "F", new DateOfBirth( "1978/08/21" ) );
				var libby = new Person( "Libby Smith", "F", new DateOfBirth( "1983/12/28" ) );
				var kit = new Person( "Kit Smith", "F", new DateOfBirth( "1982/10/14" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var vincent = new Person( "Vincent Smith", "M", new DateOfBirth( "1981/03/10" ) );
				var dominic = new Person( "Dominic Smith", "M", new DateOfBirth( "1978/08/21" ) );
				var johnny = new Person( "Johnny Smith", "M", new DateOfBirth( "1983/12/28" ) );
				var bodhi = new Person( "Bodhi Smith", "M", new DateOfBirth( "1982/10/14" ) );
				

				var socialCircle = new SocialCircle();

				socialCircle.addPerson( sarah );
				socialCircle.addPerson( tricia );
				socialCircle.addPerson( joanna );
				socialCircle.addPerson( libby );
				socialCircle.addPerson( kit );

				this.assertFail(
					function() {

						socialCircle.addPerson( arnold );

					}
				);
				

				var socialCircle = new SocialCircle();

				socialCircle.addPerson( arnold );
				socialCircle.addPerson( vincent );
				socialCircle.addPerson( dominic );
				socialCircle.addPerson( johnny );
				socialCircle.addPerson( bodhi );

				this.assertFail(
					function() {

						socialCircle.addPerson( sarah );

					}
				);

			},


			testLoveTriangle: function() {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var tricia = new Person( "Tricia Smith", "F", new DateOfBirth( "1981/03/10" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var vincent = new Person( "Vincent Smith", "M", new DateOfBirth( "1981/03/10" ) );
				var socialCircle = new SocialCircle();


				sarah.addAttraction( arnold );
				sarah.addAttraction( vincent );
				arnold.addAttraction( tricia );

				socialCircle.addPerson( sarah );
				socialCircle.addPerson( vincent );
				socialCircle.addPerson( arnold );

				this.assertFail(
					function() {

						socialCircle.addPerson( tricia );

					}
				);


				this.assertFalse( tricia.isInSocialCircle( socialCircle ) );
				this.assertFalse( socialCircle.hasPerson( tricia ) );


				this.assertFail(
					function() {

						arnold.addAttraction( sarah );

					}
				);

				this.assertTrue( sarah.isAttractedTo( arnold ) );
				this.assertFalse( arnold.isAttractedTo( sarah ) );

			},


			testMutualAttractions: function() {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var socialCircle = new SocialCircle();

				sarah.addAttraction( arnold );
				arnold.addAttraction( sarah );

				socialCircle.addPerson( sarah );

				this.assertFail(
					function() {

						socialCircle.addPerson( arnold );

					}
				);

			}
			
		});

	}
);
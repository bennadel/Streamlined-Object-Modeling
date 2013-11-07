define(
	[
		"Person",
		"DateOfBirth"
	],
	function( Person, DateOfBirth ) {

		return({

			testPerson: function() {

				var jenna = new Person( "Jenna Smith", "F", new DateOfBirth( "1974/05/09" ) );

				this.assertTrue( jenna.getName() === "Jenna Smith" );
				this.assertTrue( jenna.getGender() === "F" );
				this.assertTrue( jenna.isFemale() );
				this.assertFalse( jenna.isMale() );


				var johnny = new Person( "Johnny Smith", "M", new DateOfBirth( "1980/11/27" ) );

				this.assertTrue( johnny.getName() === "Johnny Smith" );
				this.assertTrue( johnny.getGender() === "M" );
				this.assertTrue( johnny.isMale() );
				this.assertFalse( johnny.isFemale() );


				this.assertFail(
					function testInvalidAssignment() {

						jenna.setGender( "M" );

					}
				);

				this.assertFail(
					function testInvalidAssignment() {

						jenna.setDateOfBirth( new DateOfBirth( "1980/01/01" ) );

					}
				);


				jenna.setName( "J-Dog" );

				this.assertTrue( jenna.getName() === "J-Dog" );


				var personA = new Person( "Tricia Smith", "F", new DateOfBirth( "1980/01/01" ) );
				var personB = new Person( "Tricia Smith", "F", new DateOfBirth( "1980/01/01" ) );
				var personC = new Person( "Libby Smith", "F", new DateOfBirth( "1980/01/01" ) );

				this.assertTrue( personA.equals( personB ) );
				this.assertTrue( personB.equals( personA ) );
				this.assertFalse( personA.equals( personC ) );
				this.assertFalse( personC.equals( personB ) );

			},


			testAttraction: function() {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1970/09/03" ) );
				var tricia = new Person( "Tricia Smith", "F", new DateOfBirth( "1981/11/22" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1972/12/28" ) );
				var vincent = new Person( "Vincent Smith", "M", new DateOfBirth( "1983/08/17" ) );

				sarah.addAttraction( tricia );
				sarah.addAttraction( arnold );

				this.assertTrue( sarah.isAttractedTo( tricia ) );
				this.assertTrue( sarah.isAttractedTo( arnold ) );
				this.assertFalse( sarah.isAttractedTo( vincent ) );
				this.assertFalse( tricia.isAttractedTo( sarah ) );
				this.assertFalse( vincent.isAttractedTo( sarah ) );


				sarah.removeAttraction( tricia );

				this.assertFalse( sarah.isAttractedTo( tricia ) );
				this.assertTrue( sarah.isAttractedTo( arnold ) );
				this.assertFalse( sarah.isAttractedTo( vincent ) );


				sarah.removeAttraction( arnold );

				this.assertFalse( sarah.isAttractedTo( tricia ) );
				this.assertFalse( sarah.isAttractedTo( arnold ) );
				this.assertFalse( sarah.isAttractedTo( vincent ) );


				this.assertFail(
					function testBadAttraction() {

						sarah.addAttraction( sarah );

					}
				);


				this.assertFail(
					function testDuplicateAttraction() {

						sarah.addAttraction( arnold );
						sarah.addAttraction( arnold );

					}
				);

			}
			
		});

	}
);
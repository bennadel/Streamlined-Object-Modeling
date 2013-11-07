define(
	[
		"DateOfBirth"
	],
	function( DateOfBirth ) {

		return({

			testWithCurrentDate: function() {

				var now = new Date();
				var dob = new DateOfBirth( now );

				this.assertTrue( dob.getAge() === 0 );
				this.assertTrue( dob.isAgeLTE( 0 ) );
				this.assertTrue( dob.isAgeLT( 1 ) );
				this.assertTrue( dob.isAgeEQ( 0 ) );
				this.assertFalse( dob.isAgeGT( 0 ) );
				this.assertTrue( dob.isAgeGTE( 0 ) );

			},


			testWithPreviousDate: function() {

				var now = new Date();
				var fiveYearsInMS = ( 5 * 365 * 24 * 60 * 60 * 1000 );
				var dob = new DateOfBirth( now.getTime() - fiveYearsInMS );

				this.assertTrue( dob.getAge() === 5 );
				this.assertTrue( dob.isAgeLT( 6 ) );
				this.assertTrue( dob.isAgeLTE( 5 ) );
				this.assertTrue( dob.isAgeEQ( 5 ) );
				this.assertTrue( dob.isAgeGTE( 5 ) );
				this.assertTrue( dob.isAgeGT( 4 ) );

			},


			testWithParsedDate: function() {

				var dateA = new DateOfBirth( "1980/06/12" );
				var dateB = new DateOfBirth( "1980/06/12" );
				var dateC = new DateOfBirth( "1990/01/01" );

				this.assertTrue( dateA.equals( dateB ) );
				this.assertTrue( dateB.equals( dateA ) );
				this.assertFalse( dateA.equals( dateC ) );
				this.assertFalse( dateC.equals( dateB ) );

			},


			testFailure: function() {

				this.assertFail(
					function() {

						var dob = new DateOfBirth( "blam sauce" );

					}
				);

			}
			
		});

	}
);
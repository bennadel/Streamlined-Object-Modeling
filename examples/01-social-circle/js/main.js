
// Configure the path to all of the modules. Since we're defining the baseUrl as the 
// model directory, all modules (without relative paths) will be assumed to be loaded
// from within the model directory.
require.config({
	baseUrl: "js/model/",
	paths: {
		lodash: "../../../vendor/lodash/lodash-2.2.1",
		printStackTrace: "../../../vendor/stacktrace/stacktrace"
	},
	shim: {
		lodash: {
			exports: "_"
		},
		printStackTrace: {
			exports: "printStackTrace"
		}
	}
});


// Build, join, test, and have fun with the model.
require(
	[ "Util", "DateOfBirth", "Person", "SocialCircle" ],
	function( util, DateOfBirth, Person, SocialCircle ) {


		console.info( "Running unit tests." );


		util.test( 
			function testDateOfBirth( assertTrue, assertFalse, assertFail ) {

				var now = new Date();
				var dob = new DateOfBirth( now );

				assertTrue( dob.getAge() === 0 );
				assertTrue( dob.isAgeLTE( 0 ) );
				assertTrue( dob.isAgeLT( 1 ) );
				assertTrue( dob.isAgeEQ( 0 ) );
				assertFalse( dob.isAgeGT( 0 ) );
				assertTrue( dob.isAgeGTE( 0 ) );


				var fiveYearsInMS = ( 5 * 365 * 24 * 60 * 60 * 1000 );
				var dob = new DateOfBirth( now.getTime() - fiveYearsInMS );

				assertTrue( dob.getAge() === 5 );
				assertTrue( dob.isAgeLT( 6 ) );
				assertTrue( dob.isAgeLTE( 5 ) );
				assertTrue( dob.isAgeEQ( 5 ) );
				assertTrue( dob.isAgeGTE( 5 ) );
				assertTrue( dob.isAgeGT( 4 ) );


				assertFail(
					function testInvalidDateOfBirth() {

						var dob = new DateOfBirth( "blam" );

					}
				);


				var dateA = new DateOfBirth( "1980/06/12" );
				var dateB = new DateOfBirth( "1980/06/12" );
				var dateC = new DateOfBirth( "1990/01/01" );

				assertTrue( dateA.equals( dateB ) );
				assertTrue( dateB.equals( dateA ) );
				assertFalse( dateA.equals( dateC ) );
				assertFalse( dateC.equals( dateB ) );
				
			}
		);


		util.test(
			function testPerson( assertTrue, assertFalse, assertFail ) {

				var jenna = new Person( "Jenna Smith", "F", new DateOfBirth( "1974/05/09" ) );

				assertTrue( jenna.getName() === "Jenna Smith" );
				assertTrue( jenna.getGender() === "F" );
				assertTrue( jenna.isFemale() );
				assertFalse( jenna.isMale() );


				var johnny = new Person( "Johnny Smith", "M", new DateOfBirth( "1980/11/27" ) );

				assertTrue( johnny.getName() === "Johnny Smith" );
				assertTrue( johnny.getGender() === "M" );
				assertTrue( johnny.isMale() );
				assertFalse( johnny.isFemale() );


				assertFail(
					function testInvalidAssignment() {

						jenna.setGender( "M" );

					}
				);

				assertFail(
					function testInvalidAssignment() {

						jenna.setDateOfBirth( new DateOfBirth( "1980/01/01" ) );

					}
				);


				jenna.setName( "J-Dog" );

				assertTrue( jenna.getName() === "J-Dog" );


				var personA = new Person( "Tricia Smith", "F", new DateOfBirth( "1980/01/01" ) );
				var personB = new Person( "Tricia Smith", "F", new DateOfBirth( "1980/01/01" ) );
				var personC = new Person( "Libby Smith", "F", new DateOfBirth( "1980/01/01" ) );

				assertTrue( personA.equals( personB ) );
				assertTrue( personB.equals( personA ) );
				assertFalse( personA.equals( personC ) );
				assertFalse( personC.equals( personB ) );

			}
		);


		util.test(
			function testAttraction( assertTrue, assertFalse, assertFail ) {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1970/09/03" ) );
				var tricia = new Person( "Tricia Smith", "F", new DateOfBirth( "1981/11/22" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1972/12/28" ) );
				var vincent = new Person( "Vincent Smith", "M", new DateOfBirth( "1983/08/17" ) );

				sarah.addAttraction( tricia );
				sarah.addAttraction( arnold );

				assertTrue( sarah.isAttractedTo( tricia ) );
				assertTrue( sarah.isAttractedTo( arnold ) );
				assertFalse( sarah.isAttractedTo( vincent ) );
				assertFalse( tricia.isAttractedTo( sarah ) );
				assertFalse( vincent.isAttractedTo( sarah ) );


				sarah.removeAttraction( tricia );

				assertFalse( sarah.isAttractedTo( tricia ) );
				assertTrue( sarah.isAttractedTo( arnold ) );
				assertFalse( sarah.isAttractedTo( vincent ) );


				sarah.removeAttraction( arnold );

				assertFalse( sarah.isAttractedTo( tricia ) );
				assertFalse( sarah.isAttractedTo( arnold ) );
				assertFalse( sarah.isAttractedTo( vincent ) );


				assertFail(
					function testBadAttraction() {

						sarah.addAttraction( sarah );

					}
				);


				assertFail(
					function testDuplicateAttraction() {

						sarah.addAttraction( arnold );
						sarah.addAttraction( arnold );

					}
				);

			}
		);


		util.test(
			function testSocialCircle( assertTrue, assertFalse, assertFail ) {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var kit = new Person( "Kit Smith", "F", new DateOfBirth( "1982/10/14" ) );
				var socialCircle = new SocialCircle();

				socialCircle.addPerson( sarah );
				socialCircle.addPerson( arnold );

				assertTrue( socialCircle.hasPerson( sarah ) );
				assertTrue( socialCircle.hasPerson( arnold ) );
				assertTrue( sarah.isInSocialCircle( socialCircle ) );
				assertTrue( arnold.isInSocialCircle( socialCircle ) );
				assertFalse( socialCircle.hasPerson( kit ) );
				assertFalse( kit.isInSocialCircle( socialCircle ) );


				socialCircle.removePerson( sarah );

				assertFalse( sarah.isInSocialCircle( socialCircle ) );
				assertFalse( socialCircle.hasPerson( sarah ) );
				assertTrue( arnold.isInSocialCircle( socialCircle ) );
				assertTrue( socialCircle.hasPerson( arnold ) );

			}
		);


		util.test(
			function testSocialCircleGenderRatio( assertTrue, assertFalse, assertFail ) {

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

				assertFail(
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

				assertFail(
					function() {

						socialCircle.addPerson( sarah );

					}
				);

			}
		);


		util.test(
			function testSocialCircleLoveTriangle( assertTrue, assertFalse, assertFail ) {

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

				assertFail(
					function() {

						socialCircle.addPerson( tricia );

					}
				);


				assertFalse( tricia.isInSocialCircle( socialCircle ) );
				assertFalse( socialCircle.hasPerson( tricia ) );


				assertFail(
					function() {

						arnold.addAttraction( sarah );

					}
				);

				assertTrue( sarah.isAttractedTo( arnold ) );
				assertFalse( arnold.isAttractedTo( sarah ) );

			}
		);


		util.test(
			function testSocialCircleMutualAttraction( assertTrue, assertFalse, assertFail ) {

				var sarah = new Person( "Sarah Smith", "F", new DateOfBirth( "1980/02/11" ) );
				var arnold = new Person( "Arnold Smith", "M", new DateOfBirth( "1980/02/11" ) );
				var socialCircle = new SocialCircle();

				sarah.addAttraction( arnold );
				arnold.addAttraction( sarah );

				socialCircle.addPerson( sarah );

				assertFail(
					function() {

						socialCircle.addPerson( arnold );

					}
				);

			}
		);


		console.info( "Unit tests completed." );


	}
);
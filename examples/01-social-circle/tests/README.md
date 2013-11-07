
# Tiny Test JS - JavaScript Unit Testing Framework

by [Ben Nadel][bennadel] (on [Google+][google-plus])

Tiny Test JS is a JavaScript unit testing framework that I built for personal use as a 
means to become more comfortable with [Streamlined Object Modeling][streamlined] and 
Object Oriented Programming (OOP) in general. For the most part, it's a JavaScript port
of my [Tiny Test][tinytest] framework for ColdFusion unit testing. However, since 
JavaScript does not have access to the local file system, Tiny Test JS requires slightly
more configuration. That said, it's intended to be extremely light-weight; you just drop
it in, tell it what test specifications area available, and open it in the browser.

__[DEMO: View Tiny Test JS in action][demo]__

![Tiny Test JS in action][screenshot]

## Loading Specs (ie, Test Cases)

Tiny Test JS will look in the "specs" directory for your test cases. It is considered a
best practice to name your test cases such that the end with the term, "Test." The 
following are all valid test case file names:

* AccountTest.js
* PrimeNumberGeneratorTest.js
* UserServiceTest.js

Of course, since JavaScript does not have access to the local file system, it cannot 
scan the "specs" directory on its own. As such, the naming conventions of your test cases
are somewhat optional; you have to explicitly tell Tiny Test JS which files are going to 
be used for testing. This is done in the Application.js file, which is in the root of the
Tiny Test JS application:

```JavaScript
// Configure the path mappings for the modules in your application.
require.config({
	baseUrl: "../../app/model",
	paths: {
		/* Moar paths! */
	}
});

// Tell Tiny Tst JS which modules to look for in the "specs" directory.
require.specs = [
	"ExampleOfGoodTest",
	"ExampleOfNotGoodTest"
];
```

As you can probably tell from the code above, Tiny Test JS uses RequireJS to load your
test specifications into the test harness. This means that you can create RequireJS path 
mappings in the above Application.js file such that your test cases can locate JavaScript
dependencies within your parent application.

The "require.specs" property is an array of file names (less the .js file extension) that
defines which test cases Tiny Test JS should "look" for within the "specs" directory. 
Note that you don't have to run all of these tests at one time - you're simply telling 
Tiny Test JS that these test cases exist.

## Test Cases

Your test cases need to be defined using the RequireJS define() function. Tiny Test JS
expects each test case module to be an object that contains your test methods. This 
object should be defined within a callback that loads external dependencies (ie, the 
modules on which you are going to execute unit tests):

```JavaScript
define(
	[
		// "lib/MyModuleA",
		// "lib/MyModuleB"
	],
	function( /* ModuleA, ModuleB */ ) {

		return({
			beforeTests: function() {},
			afterTests: function() {},
			testThatThisRuns: function() {},
			testThatThisRunsAsWell: function() {}
		});

	}
);
```

Notice here that the dependency paths can use the mappings defined in the Application.js
file in the root of the Tiny Test JS application.

Within each test case, Tiny Test JS will execute any method that starts with the term,
"test". For example, the following are all valid test method names:

* testThatThatWorks();
* testThatThisWorks();

Within each test case, you can also define optional methods that run before and / or 
after each test method:

* beforeTests() - executes _once_ before all tests (within a test case).
* setup() - executes before _each_ test method (within a test case).
* teardown() - executes after _each_ test method (within a test case).
* afterTests() - executes _once_ after all tests (within a test case).

In these methods, you can reset the module variables of your test case to be "pristine" 
for each invocation of the provided test methods.

Each of your tests cases implicitly extends the TestCase.js module that ships in the 
"specs" directory. This module should be used to define custom assertions and any other
shared functions that are common to your test cases. 

## Assertions

Each of your test methods will probably make some assertion based on the state of your
modules. Out of the box, Tiny Test JS provides only the most basic assertions:

* this.assert( truthy )
* this.assertTrue( truthy )
* this.assertFalse( falsey )
* this.assertEquals( simpleValue, simpleValue )
* this.assertNotEquals( simpleValue, simpleValue )

_**NOTE**: The assertion methods are part of the "this" context within your test cases'
test methods._

If you want to add your own custom assertions, feel free to add them to the TestCase.js
module provided in the specs directory.

Sometimes, you don't want to assert a success - you want to assert that something failed.
That is, you want to test a use-case that should break and then assert that it actually 
broke. This way, failures don't leak into your application. For this scenario, Tiny Test 
JS provides:

* this.assertFail( callback )

The test harness will execute your callback and expect it to raise an exception. If the
callback runs successfully, the test will fail. The callback is executed in the context
of your test case.

Inside of your custom assertions, you can make use of the private method, this.fail(), 
which is how Tiny Test JS tracks exceptions:

* this.fail( errorMessage )

For your convenience, it is often useful to generate the error message using the internal
method, this.stringify(). 

Hopefully you've found some of this vaguely interesting. If you want a more full-featured
JavaScript unit testing framework, I would suggest looking into [Jasmine][jasmine]; it's
a robust unit testing framework that has been battle-hardened by the JavaScript 
community.


[bennadel]: http://www.bennadel.com
[google-plus]: https://plus.google.com/108976367067760160494?rel=author
[streamlined]: https://github.com/bennadel/Streamlined-Object-Modeling
[tinytest]: https://github.com/bennadel/TinyTest
[screenshot]: ./tinytest/screenshots/pass.png?raw=true
[demo]: http://bennadel.github.io/TinyTestJS/
[jasmine]: http://pivotal.github.io/jasmine/

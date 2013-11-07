// Configure the base path and and additional path mappings for the modules in your 
// application. This allows your target modules to load dependencies relative to the
// paths they would normally use.
require.config({
	baseUrl: "../model/",
	paths: {
		lodash: "../../vendor/lodash/lodash-2.2.1",
	},
	shim: {
		lodash: {
			exports: "_"
		}
	}
});

// Since JavaScript cannot read the local file-system, you have to tell TinyTest.js
// which test-cases that it can find in the "specs/" directory. You will only be 
// able to run the test cases listed here.
// --
// NOTE: Exclude the trailing ".js" file extension.
require.specs = [
	"DateOfBirthTest",
	"PersonTest",
	"SocialCircleTest"
];
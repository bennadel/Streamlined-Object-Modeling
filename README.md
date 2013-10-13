
# Streamlined Object Modeling

by [Ben Nadel][1] (on [Google+][2])

For the past few months, at the [recommendation of Jonah][recommended], I've been slowly working my
way through [Streamlined Object Modeling: Patterns, Rules, and Implementation][book] by Jill Nicola, 
Mark Mayfield, and Mike Abney. Object Oriented Programming (OOP) is a fairly new concept for me. 
Sure, I've been creating "components" for years but, not in an object-oriented sense; more like an 
encapsulated procedural sense. As such, evolving my brain to use "Object Think" is going to be a
long, difficult journey. I've created this project to help me work through some of the principles
that were covered in the book.

## Examples And Explorations

While there's not really much to see in the demos, as far as visuals are concerned, you can see 
the results in the browser's console. Since there are several types of objects and many types of
collaborations, I don't think any one example or exploration is going to help. Each one of these 
will help me look at different types of object models:

* [Social Circle and Friends](./examples/01-social-circle/)

And, please, any feedback or input about any one of these examples would be extremely welcome! This
stuff is so new and so foreign to me that I need all the help I can get.

## About The Book

Blog Post: _to be determined_.

In the following sections, I am attempting to outline important notes about 
[Streamlined Object Modeling][book] that I can refer to as I am building out my examples. The book 
has a _ton_ of information in it; so, what I have below is just the tip of the iceberg. 
Furthermore, what I have below is my interpretation of the principles and suggestions in the book,
so feel free to take them with a grain of salt.

## Object Selection

When it comes to defining objects within your domain model, there are four main categories:

* __People__: People play a huge role in any piece of software; but, people generally perform 
actions within a given context as defined by a given role. Each context should be modeled with a
more specific type of person. Non-human entities, such as Companies, can be personified and are
treated like "People" actors.

* __Places__: Actions that take place in a location should be modeled with a Place.

* __Things__: Things are typically the target of an action. They are often represented by a general
type definition and a more specific form of the Thing. 

* __Events__: Events tie people, places, and things together in a moment of time (or range of 
time).

As each of these objects is assembled into a object modeling pattern, they are referred to as 
"Pattern Players". Here are the pattern players, categorized by type __(Location 1100)__:

### People

* Actor
* Role

### Places

* Place
* Outer Place

### Things

* Item
* Specific Item
* Assembly
* Part
* Container
* Content
* Group
* Member

### Events

* Transaction
* Composite Transaction
* Line Item
* Follow-up Transaction

## Business Rules - Implementation Strategies

I'm a fan of rules and "best practices;" and, [Streamlined Object Modeling[book] has some really 
interesting best practices around the way that business rule checking should be implemented within
Objects. I'll try to recap what I've learned so far, partly for your [reader] benefit; but, mostly
because it will help drive these concepts into my head as I prepare to write some code.

### Property Rules

I have always thought about "setters" as performing a single action. But, as they point out in the,
book, setting a property actually consists of three distinct actions, each of which can be factored 
out into a smaller, more cohesive methods:

> Method cohesiveness essentially means that a method should do only one thing. Setting a property
> involves doing three things: (1) checking the local validity of the new value, (2) checking the
> business rule validity of the new value, and (3) assigning the new value. To maximize the method
> cohesiveness of the property set accessor, isolate the business rule check and the value 
> assignment into separate methods. This method-cohesive implementation has distinct advantages.
> Isolating the business rule check allows subclasses to extend and override property rules by 
> writing their own test methods. Isolating the value assignment allows bypassing the business 
> rules when necessary... Organizing your code this way keeps you from having to refactor it 
> later on. __(Location 4724)__

According to this passage (and subsequent explanations), this means that setting a property leads
to three methods:

* __setValue( aValue )__: Sets the value of the property in the target object. This is the 
"public" method called to coordinate the setting event.

* __testSetValue( aValue )__: Tests the value against the object's property rules and raises an
exception if the rule checking fails (or returns Void if all tests pass). This method is also 
public because it can help with validation later on.

* __doSetValue( aValue )__: Assigns the value to the object's property variable. This method 
circumvents any validation as it assumes the "test" methods were already called. This method can
also be "public" in order to help coordinate "collaboration" rules as well as to help object 
creation from a persistent data store.

#### Cross-Property Validation

When you're dealing with a single property, the test() methods may be verbose; but, they are fairly
straightforward. When you have to perform validation across multiple objects, however, it gets a
bit more complicated. When testing for validation across multiple objects, the a test must be 
performed in the current object; then, in the collaborating object (which may veto the validation
and, therefore, the action).

### Collaboration Rules

Whereas property rules determine whether a property can be set, collaboration rules are the 
business rules that determine whether a relationship between two objects can be created or 
dissolved. And, like cross-property validation, collaboration rules must be validated by all 
of the objects involved in the collaboration. This is true regardless of which object initiates the
collaboration request.

Like property accessors, it is recommended that collaboration accessors be split up into three 
smaller cohesive methods that allow for pluggability and extension:

* __add( aCollaborator )__: Adds the collaborator to the current object. This is the "public" 
method coordinates the cross-object validation and application.

* __testAdd( aCollaborator )__: Tests collaborator against the objects state and collaboration
rules and raises an exception if the rule checking fails (or returns Void if all tests pass). This
method is also "public" as it will give us the ability to streamline the cross-object validation
(see below).

* __doAdd( aCollaborator )__: Assigns or adds the collaborator to the object's properties. This
method circumvents validation as it assumes the "test" methods were already called. This method
can also be "public" in order to help object creation from a persistent store.

*__NOTE__: The use of "add" does not imply that all collaborators are collections of objects. 
Setting a single collaborator is an "add" so as to differentiate from a property accessor.*

#### Streamlining Collaboration Accessors

Since collaborative rule checking requires that all [involved] objects perform rule checking,
the process can be streamlined by electing one object as the "coordinator." The other objects can
then defer to this object to execute the majority of the work-flow. This means that one object will
be responsible for calling the "test" and "do" methods for both objects. 

Notice, however, that while this approach cuts down on code duplication, the work-flow still defers
to the appropriate objects for logic and execution. We are not creating __God Objects__:

> All the collaboration rules cannot be consolidated in one object. While putting all rules 
> in one place may make the implementation easier in the short-term, it destroys pluggability,
> extensibility, and scalability. __(Location 4921)__

When determining which object will play the role of coordinator, follow the principle of, "Most 
Specific Carries the Load":

* Generic delegates to Specific.
* Whole delegates to a Part.
* Specific delegates to a Transaction.

### Possible Topics To "Flesh-Out"

* Rolling-back a partially-valid collaboration.
* Conflict collaboration rules.
* Others...

## JavaScript Environment

I've decided to execute this exploration in a JavaScript context because it is a very general and
well-known language. And frankly, I'm gonna need a __lot of help__ on this journey. By using 
JavaScript, I'm hoping that people will actually be encouraged to give me constructive feedback.

## RequireJS Module Loading

I've decided to use [RequireJS][requirejs] as my asynchronous model loader. This way, I don't have 
to explicitly load each script; but, more importantly, RequireJS will keep me more honest about 
defining each class as its own cohesive module. 

Each exploration will have its own Domain Model and will have its logic executed in the main.js 
file (once all of the JavaScript modules have loaded).


[1]: http://www.bennadel.com
[2]: https://plus.google.com/108976367067760160494?rel=author
[book]: http://amzn.to/19CdGIu
[dunbar]: en.wikipedia.org/wiki/Dunbar's_number
[recommended]: http://www.bennadel.com/blog/2470-What-If-All-User-Interface-UI-Data-Came-In-Reports-.htm#comments_42341
[requirejs]: http://requirejs.org/


# Streamlined Object Modeling

by [Ben Nadel][1] (on [Google+][2])

For the past few months, at the recommendation of Jonah (thanks!), I've been slowly working my way
through [Streamlined Object Modeling: Patterns, Rules, and Implementation][3] by Jill Nicola, Mark
Mayfield, and Mike Abney. Object Oriented Programming (OOP) is a fairly new concept for me. Sure,
I've been creating "components" for years but, not in an object-oriented sense; more like an 
encapsulated procedural sense. As such, evolving my brain to use "Object Think" is going to be a
long, difficult journey. I've created this project to help me work through some of the principles
that were covered in the book.

## About The Book

Blog Post: __to be determined__.

## Domain Model And Business Rules

I really enjoy working with human concepts (since they make sense in my head) and human 
interactions. As such, I thought it would be fun (and complex enough) to try to model the rules 
that surround a group of friends. Each group will be composed of one or more people, including both
men and women. But, the following rules apply:

* No group of friends can be larger than 150 members, according to [Dunbar's number][dunbar].

* Men and women can be in the same group, so long as the ratio of one gender to the other does not
drop lower than 1/4. Meaning, you cannot have a group with 5 men and 1 woman (or vice-versa).

* Men and women cannot be in the same group of friends if they share a mutual attraction towards
one another (you've seen When Harry Met Sally, right?).

* Unrequited attractions are allowed; but, only if they don't create a love-triangle. Meaning, it's
OK for Sarah to have a crush on Bob, only so long as Bob does _not_ have a crush on someone else. 
This would only lead to unnecessary heart-ache in causal conversation.

* No person in the group can be under the age of 18 (we're all adults here).

* People can belong to more than one social circle (ie, group of friends). 

Anyway, that's just my first pass on the topic. As I start learning about this stuff, I'm sure 
that I'll add and remove from this list.


[1]: http://www.bennadel.com
[2]: https://plus.google.com/108976367067760160494?rel=author
[3]: http://amzn.to/19CdGIu
[dunbar]: en.wikipedia.org/wiki/Dunbar's_number

# Social Circle And Friends

by [Ben Nadel][bennadel] (on [Google+][goggle-plus])

[View the Live Demo][demo]

I really enjoy working with human concepts (since they make sense in my head) and human 
interactions. As such, I thought it would be fun (and complex enough) to try to model the rules 
that surround a group of friends. Each group will be composed of one or more people, including both
men and women. But, the following rules apply:

* __[Property]__ No group of friends can be larger than 150 members, according to 
[Dunbar's number][dunbar].

* __[Property]__ Men and women can be in the same group, so long as the ratio of one gender to the
other does not drop lower than 1/4. Meaning, you cannot have a group with 5 men and 1 woman (or 
vice-versa).

* __[Conflict]__ Men and women cannot be in the same group of friends if they share a mutual 
attraction towards one another (you've seen When Harry Met Sally, right?).

* __[Conflict]__ Unrequited attractions are allowed; but, only if they do not create a love-
triangle. Meaning, it's OK for Sarah to have a crush on Bob, only so long as Bob does _not_ have a 
crush on someone else. This would only lead to unnecessary heartache in causal conversation.

* __[Property]__ No person in the group can be under the age of 18 (we're all adults here).

* __[Multiplicity]__ People can belong to more than one social circle (ie, group of friends). 

* __[Property]__ No person can have an attraction to themselves (ie, no narcissists here, please).

Anyway, that's just my first pass on the topic. As I start to learn more about this stuff, I'm sure
that I'll add and remove from this list. Also, I tried to put the type of rule that each constraint
represents; however, I am not sure those are accurate.

## Collaboration Pattern Players

When I first started putting some code down, I had several more objects than I have now. I think 
this is because I didn't really think about the problem, I just dove in. Going forward, I'd like to
think more about the objects in question and about what kind of pattern players they are within the
problem space.

In this example, I end up only having two pattern players: __Person -- SocialCircle__. They form 
a __Member -- Group__ collaboration in which a member (Person) knowns zero or more groups 
(SocialCircle) and each group (SocialCircle) knows zero or more members (Person).


[bennadel]: http://www.bennadel.com
[goggle-plus]: https://plus.google.com/108976367067760160494?rel=author
[demo]: http://bennadel.github.io/Streamlined-Object-Modeling/examples/01-social-circle/
[dunbar]: http://en.wikipedia.org/wiki/Dunbar's_number
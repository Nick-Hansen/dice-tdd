dice-tdd
===========

This module helps you learn TDD while writing a Node.js module.

Usage:
======

Check out this code. Ensure you are on master branch. Run `npm test` to see the tests fail. Your first failure 
will be due to the module dice.js being missing. Create an empty file called `dice.js` in the root of the project
and you should see the full test suite run and fail.

Start by opening up `test/dice-test.js` and reading the tests. Tests all call the `it()` function. The first test looks 
like this:

    it('Should return six', function() {
        expect(dice.roll()).to.equal(6);
    });

See that it runs `dice.roll()` and expects the returned value to be 6. You can make this 
pass by adding this code to the `dice.js` module:

    var roll = function() {
        return 6;
    }
    
    module.exports = {
        roll: roll
    }

Save that file and re-run the test. You should have a passing test.

Explanation of what just happened:
==================================

You created one function called roll that simply returns the number 6. You then exported an object `{  }` with 
a single value, roll, which was the roll function.

When you ran the test `dice.roll()` returned an acceptable value and the test passed.

Your goal:
==========

Make all of your tests pass.

In the end you will have a dice module that rolls a dice. By default, it will be a six-sided dice (d6), but you 
can pass in a value to the roll() function that sets it to however many sides you want.

There will also be a `rollHistory()` method which shows you all the rolls, and a `clearHistory()` which, as you 
might guess, clears the roll history.

Mocks, helpers and proxy classes:
=================================

Your end result will use `Math.random()`. However, `Math.random()` cannot be mocked and you'll have weird, flaky 
tests if you don't mock it. To work around this, two things have been done:

* A proxy module called `randomHelper.js` was created. This exports a single function, so instead of using 
`Math.random()` instead use code like this:

    var random = require('./randomHelper');
    random();

In this case, `random()` will have exactly the same behavior as `Math.random()`;

* There is a `before()` function defined in the tests, which runs before the first test is executed. It intercepts
the call to `require('./randomHelper')` and replaces it with a stub function which always returns 0.99999. There
is also an `after()` function which reverses this functionality.

Notice that in the second test we temporarily change the return value of the stub so that it returns 0.00001, checks the return value of the roll() function and then reverts the stub's behavior. This forces us to write smarter code.

How to check your work
======================

There is a branch called [completed](https://github.com/newz2000/dice-tdd/tree/completed) which you can use to compare your work against my completed module. The easy
way to review that code is to look at it here on Github, but you can also fetch that branch and review it locally.

Comments, questions and issues are welcome.

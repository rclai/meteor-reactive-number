# ReactiveNumber

Manipulate and fetch a number reactively.

## Installation

`meteor add lai:reactive-number`

## Why?

Because I'm sick and tired of doing:

```js
Session.set('counter', Session.get('counter')++);
// and
number.set(number.get()++);
```

## Usage

This is the initial Meteor counter app, but using `ReactiveNumber` instead of `Session`.

```js
if (Meteor.isClient) {
  // counter starts at 0
  var counter = new ReactiveNumber(0);

  Template.hello.helpers({
    counter: function () {
      return counter.get();
    }
  });

  Template.hello.events({
    'click button': function () {
      counter.add(1);
    }
  });
}
```

Here's all the use cases.

```js
var number = new ReactiveNumber(1);
number.add(1) // 2
number.subtract(12); // -10
number.multiply(-10); // 100
number.divide(4); // 25
number.calculate(function (number) {
  return Math.sqrt(number); // 5
});
```

You can also chain your calls (v2.0):

```js
var number = new ReactiveNumber(1);
number
  .add(1) // 2
  .subtract(12); // -10
  .multiply(-10); // 100
  .divide(4); // 25
  .calculate(function (number) {
    return Math.sqrt(number); // 5
  });
```

You can use most of the `Math` functions (v2.0):

```js
var number = new ReactiveNumber(100);
number
  // You don't have to pass an argument for all the
  // single-argument Math functions
  .sqrt(); // 10
  // For the Math functions that take two arguments
  // you only need to pass the second argument, the
  // first argument is implicit
  .pow(2); // 100
  // For the Math.min and Math.max functions which take
  // any number of arguments, the current value of the reactive
  // number is included in the list of arguments and will set
  // the min (or max) value as the new value
  .min(400, 1, 20) // 1
```

## API

#### new ReactiveNumber(Number);

Instantiates a reactive number. Floats allowed. NaNs not allowed. Defaults to 0 if nothing is passed.

#### .get()

Returns the value of the number reactively. You can call this at the end of a chaining sequence to get your value.

#### .set()

Sets the value of the number and triggers reactivity. The following methods set the value as well.

#### .add(Number)

#### .subtract(Number)

#### .multiply(Number)

#### .divide(Number)

#### .calculate(Function)

Need something more elaborate? To create a custom calculation, pass in a function with the parameter as the current value of the ReactiveNumber.

#### Math functions

All [non-experimental `Math` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) are included, except for `Math.atan2(y, x)` and `Math.random()`, since they don't make much sense to include in this package.

## Warning

Do not do a calculative chaining sequence inside a Template helper or anywhere with dependency tracking (`Tracker.autorun()`), otherwise you will get stuck in an infinite loop.

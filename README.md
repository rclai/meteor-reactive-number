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

## API

#### new ReactiveNumber(Number);

Instantiates a reactive number. Floats allowed. NaNs not allowed. Defaults to 0 if nothing is passed.

#### .get()

Returns the value of the number reactively.

#### .add(Number)

#### .subtract(Number)

#### .multiply(Number)

#### .divide(Number)

#### .calculate(Function)

Pass in a function with the parameter as the current value of the ReactiveNumber.

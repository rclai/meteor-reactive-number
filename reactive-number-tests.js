var createReactiveNumber = function (value) {
  return new ReactiveNumber(value);
};

Tinytest.add('instantiation - without new.', function (test) {
  test.instanceOf(ReactiveNumber(1), ReactiveNumber);
});

Tinytest.add('instantiation - can instantiate with only Number values which include integers, floats, but not NaNs.', function (test) {
  test.instanceOf(createReactiveNumber(1), ReactiveNumber);
  test.instanceOf(createReactiveNumber(1.1), ReactiveNumber);
  test.throws(createReactiveNumber.bind(null, 'string'), 'not a valid number');
  test.throws(createReactiveNumber.bind(null, {}), 'not a valid number');
  test.throws(createReactiveNumber.bind(null, []), 'not a valid number');
  test.throws(createReactiveNumber.bind(null, NaN), 'NaN value not allowed');
});

Tinytest.add('get() - get gives the right value.', function (test) {
  var number = createReactiveNumber(12);
  test.equal(number.get(), 12);
});

Tinytest.add('add() - adding.', function (test) {
  var number = createReactiveNumber(12);
  number.add(10);
  test.equal(number.get(), 22);
});

Tinytest.add('add() - adding with negative numbers will decrement.', function (test) {
  var number = createReactiveNumber(12);
  number.add(-10);
  test.equal(number.get(), 2);
});

Tinytest.add('subtract() - subtracting.', function (test) {
  var number = createReactiveNumber(12);
  number.subtract(10);
  test.equal(number.get(), 2);
});

Tinytest.add('subtract() - subtracting with negative numbers will increment.', function (test) {
  var number = createReactiveNumber(12);
  number.subtract(-10);
  test.equal(number.get(), 22);
});

Tinytest.add('multiply() - multiplying.', function (test) {
  var number = createReactiveNumber(12);
  number.multiply(2);
  test.equal(number.get(), 24);
});

Tinytest.add('divide() - division.', function (test) {
  var number = createReactiveNumber(12);
  number.divide(6);
  test.equal(number.get(), 2);
});

Tinytest.add('calculate() - calculate the square of 12.', function (test) {
  var number = createReactiveNumber(12);
  number.calculate(function (number) {
    return number * number;
  });
  test.equal(number.get(), 144);
});

Tinytest.add('calculate() - calculate the square root of 144.', function (test) {
  var number = createReactiveNumber(144);
  number.calculate(function (number) {
    return Math.sqrt(number);
  });
  test.equal(number.get(), 12);
});

Tinytest.add('calculate() - accepts functions only.', function (test) {
  var number = createReactiveNumber(144);
  test.throws(number.calculate.bind(null, 'aewfawef'), 'must pass a function');
  test.throws(number.calculate.bind(null, 213), 'must pass a function');
  test.throws(number.calculate.bind(null, 123.12), 'must pass a function');
  test.throws(number.calculate.bind(null, {}), 'must pass a function');
  test.throws(number.calculate.bind(null, NaN), 'must pass a function');
});

Tinytest.add('chaining - do a sequence of calculations in a chained manner and also try the Math functions', function (test) {
  var number = createReactiveNumber(1);
  number
    .add(1)
    .subtract(1)
    .multiply(50)
    .divide(2)
    .calculate(function (number) {
      return Math.sqrt(number);
    })
    // You don't need to supply an argument to the single-argument
    // Math functions, it simply calculates it using the current value
    // of the reactive number
    .sqrt()
    .ceil()
    // Math.pow() takes two parameters normally but in this case
    // you only supply the second argument as the first argument,
    // the power
    .pow(3)
    // Math.max (and min) take as many arguments, but what it will do
    // is compare this list of numbers to the current value of the
    // reactive number and set that number as the new value, 
    // in this case 29
    .max(4, 29, 5);
  test.equal(number.get(), 29);
});

Tinytest.add('chaining - do a chain and then get the value as the last chained call', function (test) {
  var number = createReactiveNumber(144);
  test.equal(number
    .subtract(44)
    .add(100)
    .divide(2)
    .get(), 100);
});
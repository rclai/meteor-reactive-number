var createReactiveNumber = function (value) {
  return new ReactiveNumber(value);
};

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
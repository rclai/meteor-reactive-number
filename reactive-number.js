ReactiveNumber = function (number) {
  if (! (this instanceof ReactiveNumber)) {
    return new ReactiveNumber(number);
  }
  this._isNumberAllowed(number);
  this._number = number;
  this._dep = new Tracker.Dependency();
};

ReactiveNumber.prototype._isNumberAllowed = function (number) {
  if (!_.isNumber(number)) {
    throw new Meteor.Error('wrong-value', number + ' is not a valid number for ReactiveNumber. Only integers and floats allowed.');
  }
  if (_.isNaN(number)) {
    throw new Meteor.Error('wrong-value', 'NaN value not allowed in ReactiveNumber.');
  }
};

ReactiveNumber.prototype.get = function () {
  this._dep.depend();
  return this._number;
};

ReactiveNumber.prototype.set = function (number) {
  this._isNumberAllowed(number);
  // Do not invalidate if number is the same
  if (number === this._number) {
    return;
  }
  this._number = number;
  this._dep.changed();
  return this;
};

ReactiveNumber.prototype.add = function (number) {
  this.set(this._number + number);
  return this;
};

ReactiveNumber.prototype.subtract = function (number) {
  this.set(this._number - number);
  return this;
};

ReactiveNumber.prototype.multiply = function (number) {
  this.set(this._number * number);
  return this;
};

ReactiveNumber.prototype.divide = function (number) {
  this.set(this._number / number);
  return this;
};

ReactiveNumber.prototype.calculate = function (fn) {
  if (!_.isFunction(fn)) {
    throw new Meteor.Error('wrong-argument', 'You must pass a function to the `calculate` method of the ReactiveNumber instance.');
  }
  this.set(fn(this._number));
  return this;
};

_(_(Math).pick(
  'abs',
  'acos',
  'asin',
  'atan',
  'ceil',
  'cos',
  'exp',
  'floor',
  'log',
  'round',
  'sin',
  'sqrt',
  'tan',
  'max',
  'min',
  'pow'
)).each(function (mathFn, fnName) {
  ReactiveNumber.prototype[fnName] = function () {
    this.set(mathFn.apply(null, [this._number].concat(Array.prototype.slice.call(arguments))));
    return this;
  }
});
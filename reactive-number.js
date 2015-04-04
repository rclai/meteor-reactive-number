ReactiveNumber = function (number) {
  this._isNumberAllowed(number);
  this._number = number || 0;
  this._dep = new Tracker.Dependency();
};

ReactiveNumber.prototype._isNumberAllowed = function (number) {
  if (!_.isNumber(number)) {
    throw new Meteor.Error(number + ' is not a valid number for ReactiveNumber. Only integers and floats allowed.');
  }
  if (_.isNaN(number)) {
    throw new Meteor.Error('NaN value not allowed in ReactiveNumber.');
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
};

ReactiveNumber.prototype.add = function (number) {
  this.set(this._number + number);  
};

ReactiveNumber.prototype.subtract = function (number) {
  this.set(this._number - number);
};

ReactiveNumber.prototype.multiply = function (number) {
  this.set(this._number * number);
};

ReactiveNumber.prototype.divide = function (number) {
  this.set(this._number / number);
};

ReactiveNumber.prototype.calculate = function (fn) {
  check(fn, Function);
  this.set(fn(this._number));
};
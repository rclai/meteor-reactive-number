Package.describe({
  name: 'lai:reactive-number',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Manipulate and fetch a number reactively.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rclai/meteor-reactive-number.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
    'underscore',
    'check',
    'tracker'
  ]);
  api.addFiles('reactive-number.js');
  api.export('ReactiveNumber');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lai:reactive-number');
  api.addFiles('reactive-number-tests.js');
});

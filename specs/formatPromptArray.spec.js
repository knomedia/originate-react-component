var formatPromptArray = require('../lib/formatPromptArray');
var assert = require('assert');


describe('formatPromptArray', function() {

  it('returns any string it is given directly', function() {
    assert.equal(formatPromptArray('any string'), 'any string');
  });

  it('returns a string listing for an array of strings', function() {
    var results = formatPromptArray(['James', 'Fred', 'Maceo']);
    var expected = '"James", "Fred", "Maceo"';
    assert.equal(results, expected);
  });

  it('trims white space on array items', function() {
    var results = formatPromptArray([' Foo', 'Bar ', ' Baz ']);
    expected = '"Foo", "Bar", "Baz"';
    assert.equal(results, expected);
  });

});

var formatPromptArray = require('../lib/formatPromptArray');
var assert = require('assert');


describe('formatPromptArray', function() {

  it('returns any string it is given directly', function() {
    assert.equal(formatPromptArray('any string'), 'any string');
  });

  it('returns a string listing for an array of strings', function() {
    var results = formatPromptArray(['James', 'Fred', 'Maceo']);
    expected = '"James", "Fred", "Maceo"';
    assert.equal(results, expected);
  });

});

var friendlyName = require('../lib/friendlyName');
var assert = require('assert');

describe('friendlyName', function(){

  it('handles dashed names', function() {
    assert.equal(friendlyName('my-fly-component'), 'MyFlyComponent');
  });

  it('handles spaced names', function() {
    assert.equal(friendlyName('my fly component'), 'MyFlyComponent');
  });
});

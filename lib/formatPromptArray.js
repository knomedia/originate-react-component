module.exports = function formatPromptArray(results) {
  if (!(typeof results === 'string')) {
    results = arrayToFmtString(results);
  }
  return results;
}

// format array as a listing of strings
function arrayToFmtString(array) {
  var results = '';
  array.forEach(function(item, index){
    results += '"' + item + '"';
    if (index < array.length - 1) {
      results += ', ';
    }
  });
  return results;
}

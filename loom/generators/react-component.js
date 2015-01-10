var glob = require('glob');
var titleCase = require('title-case');
var prompt = require('prompt');
prompt.message = "[?]".magenta;


exports.before = function(next, env) {
  prompt.start();

  var schema = {
    properties: {
      name: {required: true, default: env.args[0]},
      description: {default: 'react component'},
      githubUrl: {description: 'github url'},
      authors: {type: 'array'},
      keywords: {type: 'array'},
      reactVersion: {default: '>=0.12.0'},
      exposedComponent: {description: 'initial component', default: 'Example'}
    }
  };

  prompt.get(schema, function(err, result){
    env.name = result.name;
    env.description = result.description;
    env.homepage = result.githubUrl;
    env.reactVersion = result.reactVersion;
    env.authors =  getPotentialArrayValues(result.authors);
    env.keywords = getPotentialArrayValues(result.keywords);
    env.exposedComponent = result.exposedComponent;
    next();
  });
};

exports.present = function(next, env) {
  next({
    name: env.name,
    headerChars: env.name.split('').map(function() { return '='; }).join(''),
    description: env.description,
    homepage: env.homepage,
    authors: env.authors,
    reactVersion: env.reactVersion,
    keywords: env.keywords,
    exposedComponent: env.exposedComponent,
    friendlyName: titleCase(env.name.replace('-', ' ')).replace(/\s/, '')
  })
};

exports.templates = getAllTemplates().map(function(template) {
  var base = __dirname.replace(/generators$/, '')+'templates/';
  return template.replace(base, '');
});


// save to the same relative location as they are in the loom templates directory
exports.savePath = function(next, env, template) {
  path = env.args[0]+'/'+template.replace('.hbs', '')
  path = path.replace('Foo', env.exposedComponent);
  next(path);
};

exports.after = function(next, env) {
  console.log('***********************************************');
  console.log('need to set some permissions on scripts here');
  console.log('***********************************************');

  console.log('\n\n'+env.args[0]+' created, open '+env.args[0]+'/README.md for instructions\n');
  next();
};

// return all normal and hidden *.hbs files
function getAllTemplates() {
  var templates = glob.sync(__dirname+'/../templates/**/*.hbs');
  templates = templates.concat(glob.sync(__dirname+'/../templates/**/\.*.hbs'));
  return templates;
}

// format array as a list of strings
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

function getPotentialArrayValues(results) {
  if (!(typeof results === 'string')) {
    results = arrayToFmtString(results);
  }
  return results;
}

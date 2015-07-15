var glob = require('glob');
var buildFriendlyName = require('../../lib/friendlyName');
var formatPromptArray = require('../../lib/formatPromptArray');
var prompt = require('prompt');
prompt.message = "[?]".magenta;


exports.before = function(next, env) {
  prompt.start();

  var schema = {
    properties: {
      name: {required: true, default: env.args[0]},
      description: {default: 'react component'},
      githubUrl: {description: 'github url'},
      // TODO: prompt array has issues (https://github.com/flatiron/prompt/issues/89)
      // authors: {type: 'array'},
      // keywords: {type: 'array'},
      authors: {message: 'authors (comma separated)'},
      keywords: {message: 'keywords (comma separated)'},
      reactVersion: {default: '^0.13.3'},
      exposedComponent: {description: 'initial component', default: buildFriendlyName(env.args[0])}
    }
  };

  prompt.get(schema, function(err, result) {
    console.log(result);
    env.name = result.name;
    env.description = result.description;
    env.homepage = result.githubUrl;
    env.reactVersion = result.reactVersion;
    env.author = result.author;
    env.authors = formatPromptArray(result.authors.split(','));
    env.keywords = formatPromptArray(result.keywords.split(','));
    // env.authors =  formatPromptArray(result.authors);
    // env.keywords = formatPromptArray(result.keywords);
    env.exposedComponent = result.exposedComponent;
    next();
  });
};

exports.present = function(next, env) {
  next({
    name: env.name,
    description: env.description,
    homepage: env.homepage,
    reactVersion: env.reactVersion,
    authors: env.authors,
    keywords: env.keywords,
    exposedComponent: env.exposedComponent,
    friendlyName: buildFriendlyName(env.name)
  });
};

exports.templates = getAllTemplates().map(function(template) {
  var base = __dirname.replace(/generators$/, '')+'templates/';
  return template.replace(base, '');
});


// save to the same relative location as they are in the loom templates directory
exports.savePath = function(next, env, template) {
  path = env.args[0]+'/'+template.replace('.hbs', '')
  path = path.replace('Foo', env.exposedComponent);
  path = path.replace('Foo-test', env.exposedComponent + '-test');
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

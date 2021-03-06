'use strict';
var generators = require('yeoman-generator');
var extend = require('deep-extend');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('es2015', {
      required: false,
      defaults: false,
      desc: 'Allow ES2015 syntax'
    });
  },

  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var eslintConfig = {
      extends: 'xo-space',
      env: {
        mocha: true
      }
    };
    var devDep = {
      'eslint-config-xo-space': '^0.7.0'
    };

    if (this.options.es2015) {
      devDep['babel-eslint'] = '^4.1.6';
      devDep['eslint-plugin-babel'] = '^3.0.0';
      eslintConfig.extends = 'xo-space/esnext';
    }

    extend(pkg, {
      devDependencies: devDep,
      eslintConfig: eslintConfig
    });

    this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
  }
});

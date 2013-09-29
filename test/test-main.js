var patternPart = "form/testSpec";

var pattern = new RegExp(patternPart);
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
            //console.log(pattern.test(file));
        }
    }
}

requirejs.config({
    "baseUrl":"/base/development/js",
    "waitSeconds": 7,
    "useSourceUrl":false,
    "paths":{
        underscore: "libs/underscore",
        jquery: "libs/jquery",
        backbone: "libs/backbone",
        marionette: "libs/backbone.marionette",
        babysitter: "libs/backbone.babysitter",
        wreqr: "libs/backbone.wreqr"
    },
    shim: {
        jquery : {
            exports : '$'
        },
        underscore: {
            exports: '_'
        },
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette : {
            deps : ['backbone'],
            exports : 'Marionette'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});


'use strict';

require.config({
	baseUrl: '',
  waitSeconds: 30,
  //onNodeCreated: function(node, config, moduleName, url) {
  //  node.addEventListener('load', function() {
  //    var line = document.createElement("div");
  //    line.className = "requireLoadingText";
  //    line.innerHTML = ">> " + moduleName
  //        + " has been loaded (200 OK)";
  //    document.body.appendChild(line);
  //  });
  //  node.addEventListener('error', function() {
  //    var line = document.createElement("div");
  //    line.className = "requireLoadingText";
  //    line.innerHTML = ">>" + 'module ' + moduleName
  //        + ' could not be loaded';
  //  });
  //},
	paths: {
		//jquery
		'jquery': './lib/jquery/dist/jquery.min',
    'jquery-ui': './lib/jquery-ui/jquery-ui.min',
    'jquery-migrate': './lib/jquery-migrate/jquery-migrate.min',

    //twitterBootstrap
    'twitterBootstrap': './lib/bootstrap/dist/js/bootstrap.min',

    // angular
    'angular': './lib/angular/angular.min',
    'ngRoute': './lib/angular-route/angular-route.min',
    'ngAnimate': './lib/angular-animate/angular-animate.min',
    'ngCookies': './lib/angular-cookies/angular-cookies.min',
    'ngResource': './lib/angular-resource/angular-resource.min',
    'ngSanitize': './lib/angular-sanitize/angular-sanitize.min',
    'ngTouch': './lib/angular-touch/angular-touch.min',
    'ngFileUpload': './lib/ng-file-upload/ng-file-upload.min',

    'ui.router': './lib/angular-ui-router/release/angular-ui-router',

    'oc.lazyLoad': './lib/oclazyload/dist/ocLazyLoad.require',

    'text': './lib/requirejs-text/text',
    'css': './lib/require-css/css.min',

    //module
    'projectSugar': './partials/layout/routeConfig'
	},
	shim: {
		'jquery-migrate': ['jquery'],
		'jquery-ui': ['jquery-migrate'],

		'twitterBootstrap': ['jquery-ui'],

    'angular': ['twitterBootstrap'],
    'ngRoute': ['angular'],
    'ngAnimate': ['ngRoute'],
    'ngCookies': ['ngAnimate'],
    'ngResource': ['ngCookies'],
    'ngSanitize': ['ngResource'],
    'ngTouch': ['ngSanitize'],
    'ngFileUpload' : ['ngTouch'],

    'ui.router': ['ngFileUpload'],

    'oc.lazyLoad': ['ui.router'],

    'text': ['oc.lazyLoad'],
    'css': ['text'],

    'projectSugar': ['css']
	}
});

require([
    'projectSugar'
  ],
  function (projectSugar) {
    $ (document).ready (function () {
      angular.bootstrap (document, ['projectSugar']);
    });

    //function loadCss(url) {
    //  var link = document.createElement("link");
    //  link.type = "text/css";
    //  link.rel = "stylesheet";
    //  link.href = url;
    //  document.getElementsByTagName("head")[0].appendChild(link);
    //}
  }//$(document).ready
);//require
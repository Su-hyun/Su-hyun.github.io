'use strict';

require.config({
	baseUrl: '',

	paths: {
		//jquery
		'jquery': 'lib/jquery/dist/jquery.min',
    'jquery-ui': 'lib/jquery-ui/jquery-ui.min',
    'jquery-migrate': 'lib/jquery-migrate/jquery-migrate.min',

    //twitterBootstrap
    'twitterBootstrap': 'lib/bootstrap/dist/js/bootstrap.min',

    // angular
    'angular': 'lib/angular/angular.min',
    'ngRoute': 'lib/angular-route/angular-route.min',
    'ngAnimate': 'lib/angular-animate/angular-animate.min',
    'ngCookies': 'lib/angular-cookies/angular-cookies.min',
    'ngResource': 'lib/angular-resource/angular-resource.min',
    'ngSanitize': 'lib/angular-sanitize/angular-sanitize.min',
    'ngTouch': 'lib/angular-touch/angular-touch.min',

    'ui.router': 'lib/angular-ui-router/release/angular-ui-router',

    'pascalprecht.translate': 'lib/angular-translate/angular-translate.min',
    'pascalprecht.translateLoaderStaticFiles': 'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    'pascalprecht.translateStorageLocal': 'lib/angular-translate-storage-local/angular-translate-storage-local.min',
    'pascalprecht.translateHandlerLog': 'lib/angular-translate-handler-log/angular-translate-handler-log.min',
    'pascalprecht.translateStorageCookie': 'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
    'tmh.dynamicLocale': 'lib/angular-dynamic-locale/dist/tmhDynamicLocale.min',

    'oc.lazyLoad': 'lib/oclazyload/dist/ocLazyLoad.require',

    'text': 'lib/requirejs-text/text',
    'css': 'lib/require-css/css.min',

    //module
    'projectSugar': 'partials/layout/routeConfig'
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

    'ui.router': ['ngTouch'],
    'pascalprecht.translate': ['ui.router'],
    'pascalprecht.translateLoaderStaticFiles': ['pascalprecht.translate'],
    'pascalprecht.translateStorageLocal': ['pascalprecht.translateLoaderStaticFiles'],
    'pascalprecht.translateHandlerLog': ['pascalprecht.translateStorageLocal'],
    'pascalprecht.translateStorageCookie': ['pascalprecht.translateHandlerLog'],
    'tmh.dynamicLocale': ['pascalprecht.translateStorageCookie'],

    'oc.lazyLoad': ['tmh.dynamicLocale'],

    'text': ['oc.lazyLoad'],
    'css': ['text'],

    'projectSugar': ['css']
	}
});

require([
    'projectSugar'
  ],
  function (projectSugar, css) {
    $ (document).ready (function () {
      angular.bootstrap (document, ['projectSugar']);
    });

    function loadCss(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }//$(document).ready
);//require
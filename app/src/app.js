(function () {
	'use strict'

	angular.module('myApp', ['ui.router', 'ngCookies', 'angular-jwt', 'ui.bootstrap', 'ngMaterial'])
		// .constant('AUTH_EVENTS', {
		// 	loginSuccess: 'auth-login-success',
		// 	loginFailed: 'auth-login-failed',
		// 	logoutSuccess: 'auth-logout-success',
		// 	sessionTimeout: 'auth-session-timeout',
		// 	notAuthenticated: 'auth-not-authenticated',
		// 	notAuthorized: 'auth-not-authorized'
		// })
		// .constant('USER_ROLES', {
		// 	all: '*',
		// 	admin: 'admin',
		// 	editor: 'editor',
		// 	guest: 'guest'
		// })
		.constant('ApiBasePath', 'http://192.168.0.197:8001')
		.config(CSRFConfig)
		.run(AuthenRedirect)

	CSRFConfig.$inject = ['$httpProvider']

	function CSRFConfig($httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}

	AuthenRedirect.$inject = ["$rootScope", "$state", "$window", "$location"]

	function AuthenRedirect($rootScope, $state, $window, $location) {

		console.log("changing ...")

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			let token = $window.sessionStorage.token;

			// if not authenticate, and the page go to another resricted page will redirect to login
			if (!token && toState.name!=="login") {
				event.preventDefault();
				$state.go('login');

			}
		});
	}

})()

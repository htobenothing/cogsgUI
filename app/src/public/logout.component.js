(function () {
	'use strict'

	angular.module('myApp')
		.component('logout',{
			
		})
		.controller('LogoutController', LogoutController)

	LogoutController.$inject = ['$http','$window','$state']

	function LogoutController($http,$window,$state) {
		delete $window.sessionStorage.token;
		$http.defaults.headers.common.Authorization = '';
		$state.go('login')
	}	


})()
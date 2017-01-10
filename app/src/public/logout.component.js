(function () {
	'use strict'

	angular.module('myApp')
		.component('logout',{
			
		})
		.controller('LogoutController', LogoutController)

	LogoutController.$inject = ['$http','$window','$state']

	function LogoutController($http,$window,$state) {
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.WeeklyAttends;
		$http.defaults.headers.common.Authorization = '';
		$state.go('login')
	}	


})()
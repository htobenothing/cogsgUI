(function(){
	'use strict'

	angular.module('myApp')
		.component('sidebar',{
			templateUrl:'app/shared/sidebar.html',
			bindings:{

			}
		})

		.controller('SidebarController',SidebarController)

		SidebarController.$inject =[]
		function SidebarController(){

		} 
})()
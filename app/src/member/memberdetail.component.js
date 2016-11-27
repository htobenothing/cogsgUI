(function(){
	'use strict'

	angular.module('myApp')
		.component('memberdetail',{
			templateUrl:'app/src/member/memberdetail.html',
			bindings:{
				viewMember:'<'
			}

		})

		.controller('MemberDetailController',MemberDetailController)

		MemberDetailController.$inject = []
		function MemberDetailController(){
			$ctrl = this;
			
		}
})()
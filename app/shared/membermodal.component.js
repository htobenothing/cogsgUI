(function () {
	'use strict'

	angular.module('myApp')
		.component("membermodalComponent", {
			templateUrl: "app/shared/membermodal.html",
			bindings: {
				resolve: "<",
				close: "&",
				dismiss: "&"
			},
			controller:"membermodalController"

		})
		.controller("membermodalController", membermodalController)
		
	function membermodalController() {
		var $ctrl = this;
		
		$ctrl.$onInit = function () {
			$ctrl.districts = $ctrl.resolve.districts.data;
			
			if($ctrl.resolve.member){
				$ctrl.member = $ctrl.resolve.member.data;
				$ctrl.state = "update"
			}else{
				$ctrl.state = "create"
			}
			console.log($ctrl.member)
			console.log("state",$ctrl.state)
		};

		$ctrl.ok = function () {
			$ctrl.member.Attend = [];
			$ctrl.close({
				$value: $ctrl.member
			});
		};

		$ctrl.cancel = function () {
			$ctrl.dismiss({
				$value: 'cancel'
			});
		};

	}

})()
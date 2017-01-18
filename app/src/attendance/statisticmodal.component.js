(function () {
	'use strict'

	angular.module('myApp')
		.component("statisticmodalComponent", {
			templateUrl: "app/src/attendance/statisticmodal.html",
			bindings: {
				resolve: "<",
				close: "&",
				dismiss: "&"
			},
			controller: "statisticmodalController"

		})
		.controller("statisticmodalController", statisticmodalController)

	statisticmodalController.$inject = ["SendEmailService"]

	function statisticmodalController(SendEmailService) {
		var $ctrl = this;

		$ctrl.$onInit = function () {
			console.log("in the modal")
			$ctrl.statistic = $ctrl.resolve.statistic;
			let curr = new Date();
			
			let LordDay = curr.getDate() - curr.getDay();
			let StartDay = LordDay - 6;
			$ctrl.StartDay = new Date(curr.setDate(StartDay)).toLocaleDateString("en-SG");
			$ctrl.LordDay = new Date(curr.setDate(LordDay)).toLocaleDateString("en-SG");

		};

		$ctrl.ok = function () {
			SendEmailService.sendEmail($ctrl.statistic);

			$ctrl.close({
				$value: $ctrl.statistic
			});
		};

		$ctrl.cancel = function () {
			$ctrl.dismiss({
				$value: 'cancel'
			});
		};

	}

})()
(function () {
	'use strict'

	angular.module('myApp')
		.component('attendanceComponent', {
			templateUrl: "app/src/attendance/attandance-master.html",
			bindings:{
				statics:"<"
			}

		})
		.service('AttendanceService', AttendanceService)
		.controller('AttendController', AttendController)


	AttendanceService.$inject = ["$http", "ApiBasePath"]

	function AttendanceService($http, ApiBasePath) {
		var service = this;
		service.getAllAttendance = function () {
			var response = $http({
				url: (ApiBasePath + "/api/attends/"),
				method: "GET"
			})
			return response;
		}

		service.createAttendance = function (data) {
			var response = $http({
				url: (ApiBasePath + "/api/attends/"),
				method: "POST",
				data: data
			})
			return response;
		}

		service.updateAttendance = function (data) {
			var id = data.Attend_ID;
			var resp = $http({
				url: (ApiBasePath + "/api/attends/" + id + "/"),
				method: "PUT",
				data: data
			})
			return resp;
		}

	}

	AttendController.$inject = ["AttendanceService", "$log", "MemberService"]

	function AttendController(AttendanceService, $log, MemberService) {
		var $ctrl = this;


		$ctrl.confirmAttend = function (data) {

				$log.info(data)
				if (!data.isSubmit) {
					if (data.attend) {
						$log.info("create attendance...")
						let attend = data.attend;
						attend.Member_ID = data.Member_ID

						var promise = AttendanceService.createAttendance(attend)
						promise.then(function (resp) {
								$log.info("Attandance create Success")
								data.newAttend = resp.data;
								$log.info(data.newAttend)
								data.isReadOnly = true;
								data.isSubmit = true;
							})
							.catch(function (err) {
								$log.info(err)
							})
					}
				} else {
					$log.info("Updating attendance...")
					let attend = data.attend;
					let newAttend = data.newAttend;
					// update data 
					newAttend.Bible_Reading = attend.Bible_Reading
					newAttend.Lords_Table = attend.Lords_Table
					newAttend.Morning_Revival = attend.Morning_Revival
					newAttend.Prayer_Meeting = attend.Prayer_Meeting
					newAttend.Small_Group = attend.Small_Group
					$log.info(newAttend)
					var promise = AttendanceService.updateAttendance(newAttend);
					promise.then(function (resp) {
							$log.info("Update Success...")
							data.newAttend = resp.data
							$log.info(data.newAttend)
							data.isReadOnly = true;
						})
						.catch(function (err) {
							$log.info(err)
						})
				}

				// $log.log("All members:",$ctrl.members)
			}


		$ctrl.showDistrictAttendance = function () {
			var promise = MemberService.getAllActiveMembers();
			promise.then(function (resp) {
					$ctrl.members = resp.data;
					// $log.info($ctrl.members)
				})
				.catch(function (err) {
					$log.info(err)
				})
			$ctrl.showAttendlist = !$ctrl.showAttendlist;

		}

		$ctrl.showStatics = function () {
			let members = $ctrl.members;
			$ctrl.statics = {
				Lords_Table: 0,
				Prayer_Meeting: 0,
				Morning_Revival: 0,
				Bible_Reading: 0,
				Small_Group: 0,
				Children: 0
			}
			$ctrl.isShowStatic = true;

			$log.info("Calculating the statics...")
			for (let i = 0; i < members.length; i++) {
				let meetings = ["Lords_Table", "Morning_Revival", "Prayer_Meeting", "Small_Group", "Bible_Reading"]
				let attend = members[i].newAttend;
				// $log.info(i, attend)
				if (attend) {
					Object.keys(attend).forEach(function (key) {
						// $log.info(attend[key])
						if (meetings.indexOf(key) !== -1) {
							if (attend[key]) {
								$ctrl.statics[key]++;
							}
						}

					})


				}
			}
			$ctrl.statics.Children = $ctrl.Children
			$log.info($ctrl.statics)
		}



	}

})()
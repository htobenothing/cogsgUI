(function () {
	'use strict'

	angular.module('myApp')
		.component('attendanceComponent', {
			templateUrl: "app/src/attendance/attandance-master.html",
			bindings: {
				statics: "<",
				members: "<"
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
		service.getWeeklyAttends = function () {
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

	AttendController.$inject = ["AttendanceService", "$log", "MemberService", "$window","$timeout","$uibModal","SendEmailService"]

	function AttendController(AttendanceService, $log, MemberService, $window, $timeout, $uibModal,SendEmailService) {
		var $ctrl = this;


		$ctrl.confirmAttend = function (data) {

			$log.info(data)
			if (!data.isSubmit) {
				if (data.attend) {
					let attend = data.attend;
					$log.info("create attendance...")
					attend.Member_ID = data.Member_ID

					var promise = AttendanceService.createAttendance(attend)
					promise.then(function (resp) {

							$log.info("Attandance create Success")
							data.newAttend = resp.data;
							$log.info(data.newAttend)
							data.isReadOnly = true;
							data.isSubmit = true;

							$window.sessionStorage.WeeklyAttends = JSON.stringify($ctrl.members);
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
						$window.sessionStorage.WeeklyAttends = JSON.stringify($ctrl.members);
					})
					.catch(function (err) {
						$log.info(err)
					})
			}

			// $log.log("All members:", $ctrl.members)


			// $log.info('Session',JSON.parse($window.sessionStorage.WeeklyAttends))

		}


		$ctrl.showDistrictAttendance = function () {
			if (!$window.sessionStorage.WeeklyAttends) {
				$log.info('New attendance ...')
				var promise = MemberService.getAllActiveMembers();
				promise.then(function (resp) {
						$ctrl.members = resp.data;
						$log.info('init data', $ctrl.members)
					})
					.catch(function (err) {
						$log.info(err)
					})
				$ctrl.showAttendlist = true;
			} else {
				let WeeklyAttends = JSON.parse($window.sessionStorage.WeeklyAttends);
				$ctrl.showAttendlist = true;

				$ctrl.members = WeeklyAttends;
				$log.info("in show District attendance", $ctrl.members)

			}


		}

		$ctrl.calculateStatistic = function(){
			let members = $ctrl.members;
			let statistic = {
					Lords_Table: 0,
					Prayer_Meeting: 0,
					Morning_Revival: 0,
					Bible_Reading: 0,
					Small_Group: 0,
					Children: 0
				}
				// $ctrl.isShowStatic = true;

			$log.info("Calculating the statistic...")
			for (let i = 0; i < members.length; i++) {
				let meetings = ["Lords_Table", "Morning_Revival", "Prayer_Meeting", "Small_Group", "Bible_Reading"]
				let attend = members[i].newAttend;
				// $log.info(i, attend)
				if (attend) {
					Object.keys(attend).forEach(function (key) {
						// $log.info(attend[key])
						if (meetings.indexOf(key) !== -1) {
							if (attend[key]) {
								statistic[key]++;
							}
						}

					})


				}
			}
			if(!$ctrl.Children){
				statistic.Children =0;
			}else{
				statistic.Children = $ctrl.Children;
			}
			
			return statistic;
		}
		$ctrl.showStatistic = function () {
			let statistic = $ctrl.calculateStatistic();
			$log.info(statistic)
			var modalInstance = $uibModal.open({
				animation: true,
				component: 'statisticmodalComponent',
				resolve: {
					statistic: function () {
						return statistic;
					}
				}
			});

			modalInstance.result.then(function (data) {
					console.log(data)
					var promise = SendEmailService.sendEmail(data);
					promise.then(function (resp) {
							alert("email send Success")
						})
						.catch(function (err) {
							alert("email fail")
						})
			}, function () {
				console.log('modal-component dismissed at: ' + new Date());
			});




		}


		$ctrl.showDistrictAttendance();
		// $timeout($ctrl.onLoad())
		// $ctrl.onLoad();

	}

})()
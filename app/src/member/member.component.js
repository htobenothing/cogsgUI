(function () {
	'use strict'

	angular.module('myApp')
		.component('memberComponent', {
			templateUrl: 'app/src/member/member.html'
		})

	.controller('MemberController', MemberController)
		.service('MemberService', MemberService)



	MemberService.$inject = ['$http', 'ApiBasePath']

	function MemberService($http, ApiBasePath) {
		var service = this;

		service.getAllActiveMembers = function () {
			var response = $http({
				url: (ApiBasePath + "/api/members/active/"),
				method: "GET",
			})
			return response;
		}

		service.getAllMembers = function () {
			var response = $http({
				url: (ApiBasePath + "/api/members/"),
				method: "GET",
			})
			return response;

		}
		service.getMemberDetail = function (id) {
			var response = $http({
				url: (ApiBasePath + "/api/members/" + id + "/"),
				method: "GET",
			})
			return response;
		}
		service.createNewMember = function (data) {
			var response = $http({
				url: (ApiBasePath + "/api/members/"),
				method: "POST",
				data: data
			})
			return response;
		}

		service.updateMember = function (data) {
			var response = $http({
				url: (ApiBasePath + "/api/members/" + data.Member_ID + "/"),
				method: "PUT",
				data: data
			})
			return response;
		}
		service.deleteMember = function (data) {
			var response = $http({
				url: (ApiBasePath + "/api/members/" + data.Member_ID + "/"),
				method: "DELETE",
			})
			return response
		}
	}

	MemberController.$inject = ['MemberService', '$uibModal', 'districtService', '$log']

	function MemberController(MemberService, $uibModal, districtService, $log) {
		var $ctrl = this;

		$ctrl.getMemberList = function () {
			var promis = MemberService.getAllMembers();
			console.log("In MemberController.GetMemberList ")
			promis.then(function (resp) {
				console.log(resp.data)
				$ctrl.members = resp.data;
			}).catch(function (err) {
				console.log("In error")
				console.log(err)
			})
		}

		$ctrl.getMemberList();

		$ctrl.viewMember = function (member) {

			let id = member.Member_ID
			console.log($ctrl.viewMember)
			let modalInstance = $uibModal.open({
				animation: true,
				component: "membermodalComponent",
				resolve: {
					districts: function () {
						return districtService.getAllDistrict();
					},
					member: function () {
						return MemberService.getMemberDetail(id)
					}
				}
			})

			modalInstance.result.then(function (member) {
				$log.warn("updating...")
				var promise = MemberService.updateMember(member)
				promise.then(function (resp) {
						$log.info("update successful ")
						$ctrl.getMemberList();
					})
					.catch(function (error) {
						$log.info(error)
					})
			})
		}


		$ctrl.showInfoTemplate = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				component: 'membermodalComponent',
				resolve: {
					districts: function () {
						return districtService.getAllDistrict();
					}
				}
			});

			modalInstance.result.then(function (member) {
				console.log(member)
				var promise = MemberService.createNewMember(member)
				promise.then(function (resp) {
						$ctrl.getMemberList();
					})
					.catch(function (err) {
						console.log(err)
					})
			}, function () {
				console.log('modal-component dismissed at: ' + new Date());
			});
		}



		$ctrl.updateMember = function (member) {

				let deleteMember = member;
				$log.info("Deleting", deleteMember);
				deleteMember.Status = false;
				var promise = MemberService.updateMember(deleteMember);

				promise.then(function (resp) {
						$log.info("delete successful", resp.data)
					})
					.catch(function (error) {
						$log.info(error)
					})
			}
			// $ctrl.deleteMember = function (member) {

		// 	let deleteMember = member;
		// 	$log.info("Deleting", deleteMember);
		// 	deleteMember.Status = false;
		// 	var promise = MemberService.deleteMember(deleteMember);

		// 	promise.then(function (resp) {
		// 			$log.info("delete successful", resp.data)
		// 			$ctrl.getMemberList();
		// 		})
		// 		.catch(function (error) {
		// 			$log.info(error)
		// 		})
		// }

	}
})()
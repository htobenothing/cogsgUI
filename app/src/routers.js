(function(){
	'use strict'

	angular.module('myApp')
		.config(RouterConfig);

	RouterConfig.$inject = ['$stateProvider','$urlRouterProvider']
	function RouterConfig($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'app/src/public/home.html',
			
		})
		.state('login',{
			url:'/login',
			templateUrl:'app/src/public/login.html',
			controller: 'LoginController as loginCtrl'
		})
		.state('logout',{
			url:'/logout',
			controller: 'LogoutController as logoutCtrl'
			
		})
		.state('sidebar',{
			url:'/sidebar',
			templateUrl:'app/shared/sidebar.html',
			controller:'SideBarController as SideBarCtrl'
		})
		.state('profile',{
			url:'/profile',
			templateUrl:'app/src/account/profile.html',
			controller : 'ProfileController as profileCtrl'
		})
		.state('member',{
			url:'/members',
			templateUrl:'app/src/member/member.html',
			controller:'MemberController as memberCtrl'
			
		})
		.state('memberdetail',{
			url:"/memberdetail",
			templateUrl:'app/src/member/memberdetail.html'
		})
		// .state('foregtPassword',{
		// 	url:'/forgetpassword',
		// 	templateUrl:'app/src/public/forgetpassword.html'
		// })
		.state('attend',{
			url:"/attend",
			templateUrl:"app/src/attendance/attendance-master.html"
		})
		.state('statics',{
			url:"/statics",
			templateUrl:"app/src/statics/statics.html"
		})
		$urlRouterProvider.otherwise('/login')
	}
})()
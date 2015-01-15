app.config(function ($routeProvider){
	$routeProvider
		.when('/',{templateUrl: 'app/components/home/homeView.html', controller:"HomeCtrl"})
		.when('/home',{templateUrl: 'app/components/homeConnected/homeConnectedView.html', controller:"HomeConnectedCtrl"})
		.when('/sandbox',{templateUrl: 'app/components/sandbox/sandboxView.html', controller:"SandboxCtrl"})
		.when('/preferences',{templateUrl: 'app/components/preferences/preferencesView.html', controller:"PreferencesCtrl"})
		.when('/play',{templateUrl: 'app/components/player/playerView.html', controller:"PlayerCtrl as controller"})
		.when('/radios',{templateUrl: 'app/components/radios/radiosView.html', controller:"RadioCtrl"})		
		.otherwise({redirectTo: '/home'});		


});
app.config(function ($routeProvider){
	$routeProvider
		.when('/',{templateUrl: 'app/components/home/homeView.html', controller:"HomeCtrl"})
		.when('/home',{templateUrl: 'app/components/homeConnected/homeConnectedView.html', controller:"HomeConnectedCtrl"})
		.when('/sandbox',{templateUrl: 'app/components/sandbox/sandboxView.html', controller:"SandboxCtrl"})		

});
app.config(function ($routeProvider){
	$routeProvider
		.when('/',{templateUrl: 'app/components/home/homeView.html', controller:"HomeCtrl"})
		.when('/home',{templateUrl: 'app/components/homeConnected/homeConnectedView.html', controller:"HomeConnectedCtrl"})
		.when('/sandbox',{templateUrl: 'app/components/sandbox/sandboxView.html', controller:"SandboxCtrl"})
		.when('/preferences',{templateUrl: 'app/components/preferences/preferencesView.html', controller:"PreferencesCtrl"})
		.when('/play',{templateUrl: 'app/components/player/playerView.html', controller:"PlayerCtrl as controller"})
		.when('/radios',{templateUrl: 'app/components/radios/radiosView.html', controller:"RadioCtrl"})
		.when('/tops',{templateUrl: 'app/components/tops/topsView.html', controller:"TopsCtrl as controller"})
		.when('/history',{templateUrl: 'app/components/history/historyView.html', controller:"HistoryCtrl as controller"})
		.when('/search',{templateUrl: 'app/components/search/searchView.html', controller:"SearchCtrl as controller"})	
		.when('/friends',{templateUrl: 'app/components/friends/friendsView.html', controller:"FriendsCtrl as controller"})	
		.when('/playlists',{templateUrl: 'app/components/playlists/playlistsView.html', controller:"PlaylistsCtrl as controller"})		
		.when('/artist/:idartiste',{templateUrl: 'app/components/artist/artistView.html', controller:"ArtistCtrl as controller"})	
		.when('/playlist/:idplaylist',{templateUrl:'app/components/playlists/soloPlaylistView.html', controller:"PlaylistsCtrl as controller"})	
		.when('/admin',{templateUrl:'app/components/admin/currentTestView.html', controller:"CurrentTestCtrl as controller"})	
		.when('/admin/current',{templateUrl:'app/components/admin/currentTestView.html', controller:"CurrentTestCtrl as controller"})	
		.when('/admin/new',{templateUrl:'app/components/admin/newTestView.html', controller:"NewTestCtrl as controller"})	
		.when('/admin/algorithms',{templateUrl:'app/components/admin/algorithmsView.html', controller:"AlgoCtrl as controller"})	
		.otherwise({redirectTo: '/home'});		


});
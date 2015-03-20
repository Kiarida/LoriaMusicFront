app.controller('TopsCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $sce){

	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;

	// var Popular = $resource(routeRessource.Popular,{},
 //    {
 //      query: {
 //        method: 'GET',
 //        isArray: true,
 //        headers: { 
 //          "Authorization" : 'WSSE profile="UsernameToken"',
 //          "X-wsse" : Auth.getUser().wsse
 //        }
 //      }
 //    });

	this.configPlaylist = {
		addToPlaylist : true,
		remove : false,
		tags : true,
		more : false,
	};


	$scope.lien = routeRessource.ItemPopular;
	
	this.tops = getTops();

	// this.videos = [
	// 	{
	// 		id : 1,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	// 		],
	// 		name: "Videogular",
	// 		artiste : "Angular",
	// 		rate: 3,
	// 		poster: "http://www.videogular.com/assets/images/videogular.png"
	// 	},
	// 	{
	// 		id : 1,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/Gonna%20Start%20v2.mp3"), type: "audio/mp3"}
	// 		],
	// 		name: "Gonna start",
	// 		artiste : "RoyalityFree",
	// 		rate: 2,
	// 		poster: "http://www.kvalitat.com/wp-content/uploads/2013/03/bandlogogic2-700x414.png"

	// 	},
	// 	{
	// 		id : 1,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/On%20the%20Ground.mp3"), type: "audio/mp3"}
	// 		],
	// 		name: "On the ground",
	// 		artiste : "RoyalityFree",
	// 		rate: 1,
	// 		poster: "http://sensiblereason.com/wp-content/uploads/2012/01/on-the-ground.jpg"
	// 	},
	// 	{
	// 		id : 1,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("https://api.soundcloud.com/tracks/185445543/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28"), type: "audio/mp3"}
	// 		],
	// 		name: "Charlie",
	// 		artiste : "Tryo",
	// 		rate: 5,
	// 		poster: "http://img.gala.fr/fit/http.3A.2F.2Fwww.2Egala.2Efr.2Fvar.2Fgal.2Fstorage.2Fimages.2Fmedia.2Fmultiupload_du_12_janvier_2015.2Ftryo.2F3206121-1-fre-FR.2Ftryo.2Ejpg/1140x499/crop-from/top/quality/80/tryo.jpg"
	// 	}

	// ];




	function getTops(){

		var Res = $resource($scope.lien,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            }
	        }
        });
		
				Res.query(null,function(mess){ controller.tops = mess; },function(error){ controller.tops = error.data; });
				
	}




}]);
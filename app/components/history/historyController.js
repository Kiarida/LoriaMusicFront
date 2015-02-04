app.controller('HistoryCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$sce', '$q',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $sce, $q){

	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;

	this.configPlaylist = { 
		addToPlaylist : true,
		remove : false,
		tags : true,
		more : false,
	};

	// this.sessions = [
	// 	{
	// 		date: "25/01/2015",
	// 		duration: "1h12",
	// 		tags: ["rap","rock","violent"],
	// 		videos : [
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	// 				],
	// 				name: "Videogular",
	// 				artiste : "Angular",
	// 				rate: 3,
	// 				poster: "http://www.videogular.com/assets/images/videogular.png",
	// 				tags: ["rap","rock"]
	// 			},
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/Gonna%20Start%20v2.mp3"), type: "audio/mp3"}
	// 				],
	// 				name: "Gonna start",
	// 				artiste : "RoyalityFree",
	// 				rate: 2,
	// 				poster: "http://www.kvalitat.com/wp-content/uploads/2013/03/bandlogogic2-700x414.png"

	// 			},
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/On%20the%20Ground.mp3"), type: "audio/mp3"}
	// 				],
	// 				name: "On the ground",
	// 				artiste : "RoyalityFree",
	// 				rate: 1,
	// 				poster: "http://sensiblereason.com/wp-content/uploads/2012/01/on-the-ground.jpg"
	// 			},
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("https://api.soundcloud.com/tracks/185445543/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28"), type: "audio/mp3"}
	// 				],
	// 				name: "Charlie",
	// 				artiste : "Tryo",
	// 				rate: 5,
	// 				poster: "http://img.gala.fr/fit/http.3A.2F.2Fwww.2Egala.2Efr.2Fvar.2Fgal.2Fstorage.2Fimages.2Fmedia.2Fmultiupload_du_12_janvier_2015.2Ftryo.2F3206121-1-fre-FR.2Ftryo.2Ejpg/1140x499/crop-from/top/quality/80/tryo.jpg"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		date: "22/01/2015",
	// 		duration: "20min",
	// 		videos : [
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	// 				],
	// 				name: "Videogular",
	// 				artiste : "Angular",
	// 				rate: 3,
	// 				poster: "http://www.videogular.com/assets/images/videogular.png"
	// 			},
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/Gonna%20Start%20v2.mp3"), type: "audio/mp3"}
	// 				],
	// 				name: "Gonna start",
	// 				artiste : "RoyalityFree",
	// 				rate: 2,
	// 				poster: "http://www.kvalitat.com/wp-content/uploads/2013/03/bandlogogic2-700x414.png"

	// 			},
	// 			{
	// 				id : 1,
	// 				sources: [
	// 					{src: $sce.trustAsResourceUrl("https://api.soundcloud.com/tracks/185445543/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28"), type: "audio/mp3"}
	// 				],
	// 				name: "Charlie",
	// 				artiste : "Tryo",
	// 				rate: 5,
	// 				poster: "http://img.gala.fr/fit/http.3A.2F.2Fwww.2Egala.2Efr.2Fvar.2Fgal.2Fstorage.2Fimages.2Fmedia.2Fmultiupload_du_12_janvier_2015.2Ftryo.2F3206121-1-fre-FR.2Ftryo.2Ejpg/1140x499/crop-from/top/quality/80/tryo.jpg"
	// 			}

	// 		]
	// 	}
	// ];

	$scope.lienSessions = routeRessource.Sessions;
	$scope.lienEcoutes = routeRessource.EcoutesBySession;
	$scope.lienTags = routeRessource.TagsBySession;
	this.sessions;


	function stringToDate(dateToConvert){
		var t = dateToConvert.split(/[- : T +]/);

		var finalDate = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		return finalDate;
		
	}

	function stringDatetoString(dateToConvert){
		

		var t = dateToConvert.split(/[- : T +]/);

		var date = ""+t[0]+" "+t[1]+" "+t[2]+" "+t[3]+":"+t[4]+":"+t[5];
		return date;

	}


	function substractDate(DateDeb, DateFin){

		var datedebut = stringToDate(DateDeb);
		var datefin = stringToDate(DateFin);

		var diff = datefin - datedebut;

		var totalSecondes = diff/1000;
	

		var heures = (totalSecondes - totalSecondes%3600)/3600;
		totalSecondes -= heures*3600;
		var minutes = (totalSecondes - totalSecondes%60)/60;
		totalSecondes -= minutes*60;
		var secondes = totalSecondes%60;

		var durationString = "";

		if(heures > 0)
			durationString+=heures+"h";
		if(minutes > 0)
			durationString+= minutes+"m";
		if(secondes > 0)
		durationString+=secondes+"s";

		return durationString
	}


	$scope.getEcoutesBySession = function(idSession){

		var deferred = $q.defer();

		var Res = $resource($scope.lienEcoutes,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id:"@id", id_session:"@id_session"}
	        }
        });
		
				Res.query(
					{id: Auth.getUser().id, id_session : idSession},
					function(mess){ 

						var ecoutes = mess;
						
						deferred.resolve(ecoutes);
						
					},
					function(error){ 
						deferred.reject(error);
						
					});

				return deferred.promise;
		
	}

	$scope.getTagsBySession = function(idSession){

		var deferred = $q.defer();

		var Res = $resource($scope.lienTags,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id:"@id", id_session:"@id_session"}
	        }
        });
		
				Res.query(
					{id: Auth.getUser().id, id_session : idSession},
					function(mess){ 

						var tags = mess;
						
						deferred.resolve(tags);
						
					},
					function(error){ 
						deferred.reject(error);
						
					});

				return deferred.promise;
		
	}


	$scope.getSessions = function(){

		var Res = $resource($scope.lienSessions,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id:"@id"}
	        }
        });
		
				Res.query(
					{id: Auth.getUser().id},
					function(mess){ 
						controller.sessions = mess;

						for(var i = 0; i < controller.sessions.length; i++){


							var session = controller.sessions[i];
							var id = session.id;

							

							session.duration = substractDate(session.datedebut, session.datefin);
							session.dateDisplay = stringDatetoString(session.datedebut);

							function closure(id, i){
								
								$scope.getEcoutesBySession(id)
							.then(function(ecoutes){
								controller.sessions[i].ecoutes = ecoutes;

								for(var j = 0; j < controller.sessions[i].ecoutes.length; j++){

									controller.sessions[i].ecoutes[j].sources =  [
												{src: $sce.trustAsResourceUrl(controller.sessions[i].ecoutes[j].url), type: "audio/mp3"}
								 				];
								 				

								}
					
							}).catch(function(error){


							}).finally(function(){

							});

							$scope.getTagsBySession(id)
							.then(function(tags){
								controller.sessions[i].tags = tags;
								console.log(tags);

							}).catch(function(error){

							}).finally(function(){

							});

							}

							closure(session.id, i);
							
						}

					},
					function(error){ controller.sessions = error.data; });
		
	}


	this.sessions = $scope.getSessions();

	

	







}]);
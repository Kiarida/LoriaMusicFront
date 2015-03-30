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



	$scope.lienSessions = routeRessource.Sessions;
	$scope.lienEcoutes = routeRessource.EcoutesBySession;
	$scope.lienTags = routeRessource.TagsBySession;
	$scope.lien5Ecoutes = routeRessource.LastEcoutes;
	this.sessions;

	$scope.historyTracks = [];



	var SessionTags = $resource(routeRessource.TagsBySession,{},
  {
    save: {
      method: 'POST',
      isArray: false,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{id: "@id", id_session:"@id_session"}
    },
    query: {
	   	method: 'GET',
	    isArray: true,
	    headers: {
	    "Authorization" : 'WSSE profile="UsernameToken"',
	    "X-wsse" : Auth.getUser().wsse
	     },
	     params:{id:"@id", id_session:"@id_session"}
	 },
    delete: {
      method: 'DELETE',
      isArray: false,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{id: "@id", id_session:"@id_session", idtag:"@idtag"}
    }

  });


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


	// $scope.getEcoutesBySession = function(idSession){

	// 	var deferred = $q.defer();

	// 	var Res = $resource($scope.lienEcoutes,{},
	// 	{
	//         'query': {
	//             method: 'GET',
	//             isArray: true,
	//             headers: {
	//               "Authorization" : 'WSSE profile="UsernameToken"',
	//               "X-wsse" : Auth.getUser().wsse
	//             },
	//             params:{id:"@id", id_session:"@id_session"}
	//         }
 //        });

	// 			Res.query(
	// 				{id: Auth.getUser().id, id_session : idSession},
	// 				function(mess){

	// 					var ecoutes = mess;

	// 					deferred.resolve(ecoutes);

	// 				},
	// 				function(error){
	// 					deferred.reject(error);

	// 				});

	// 			return deferred.promise;

	// }


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
						for(var i = 0; i < controller.sessions.length; i++){


							if(controller.sessions[i].id == idSession){
								controller.sessions[i].ecoutes = ecoutes;
								$scope.getTagsBySession(idSession);

								deferred.resolve(mess);

							}
						}
					},
					function(error){

					});

				return deferred.promise;


	}

	$scope.getTagsBySession = function(idSession){


				SessionTags.query(
					{id: Auth.getUser().id, id_session : idSession},
					function(mess){

					for(var i = 0; i < controller.sessions.length; i++){


							if(controller.sessions[i].id == idSession){
								controller.sessions[i].tags = mess;

							}
						}
					},
					function(error){

					});
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



							for(var j = 0; j < controller.sessions.length; j++){

								// var deferred = $scope.getEcoutesBySession(controller.sessions[j].id);

								// deferred.then(function(ecoutes) {

								// for(var k = 0; k < ecoutes.length; k++){
								// 	if($scope.historyTracks.length < 5){

								// 		ecoutePushed = ecoutes[k];
								// 		ecoutePushed.sources = [{src: $sce.trustAsResourceUrl(ecoutePushed.url), type:"audio/mp3"}];
								// 		$scope.historyTracks.push(ecoutePushed);
								// 		$scope.historyTracks[k]



								// 	}
								// 	else
								// 		break;
								// }

								// }, function(error) {

								// }, function() {

								// });

							}


							var session = controller.sessions[i];
							var id = session.id;
							session.duration = typeof session.datefin == "undefined" ? "Ongoing" : substractDate(session.datedebut, session.datefin);
							session.dateDisplay = stringDatetoString(session.datedebut);



						}

					},
					function(error){ controller.sessions = error.data; });




	}




	$scope.addTagSession = function(session){


		var tag = { libelle : session.tags[session.tags.length-1].libelle };

        SessionTags.save({id : Auth.getUser().id, id_session : session.id },tag, function(mess){
            session.tags[session.tags.length-1].id=mess.id;
        });
		/*for(var i=0;i<session.tags.length;i++){
	      var tag = { libelle : session.tags[i].libelle };

	      var res = SessionTags.save({id : Auth.getUser().id, id_session : session.id },tag);
    	}*/
	}

	$scope.deleteTagSession=function(session,tag){
    	SessionTags.delete({id : Auth.getUser().id, id_session : session.id, idtag : tag.id});
  	}



	this.sessions = $scope.getSessions();



}]);

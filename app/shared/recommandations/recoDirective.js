app.directive('recommandations', function(Auth, routeRessource, $resource, $timeout, $rootScope) {
  return {
    restrict: 'A',
   link: function(scope, sce, rootScope){
    	
	//var controller = this;
	//controller.algostrack=[];

      $rootScope.recomPlaylist = $rootScope.playlist;
    

	var Recommandations = $resource(routeRessource.Recommandations,{},
			{
		        'query': {
		            method: 'GET',
		            isArray: false,
		            headers: {
		              "Authorization" : 'WSSE profile="UsernameToken"',
		              "X-wsse" : Auth.getUser().wsse
		            },
		            params:{iduser:"@iduser"},
		        }
	        });

	scope.getRecommandations=function(){
	
			var algo = $rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].nom

			Recommandations.query({iduser:Auth.getUser().id, item : $rootScope.currentVideo.id},function(mess){
				var key = Object.keys(mess)[0];
				for(var i =0; i<mess[key].length; i++){
					mess[key][i].color={};
				mess[key][i].color.code=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].color;
				mess[key][i].color.name=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].label;
								

				if(!mess[key][i].urlCover){
					mess[key][i].urlCover="assets/img/placeholder.png";
				}
				$rootScope.playlist.push(mess[key][i]);
				}


				/* if($rootScope.playlist.length != $rootScope.recomPlaylist.length){
            var index = $rootScope.playlist.indexOf($rootScope.currentVideo);
            var playtemp = $rootScope.playlist.slice(index+1, $rootScope.playlist.length);
            for(var j in playtemp){
              $rootScope.recomPlaylist.push(playtemp[j]);

            }
          }*/
          $(".reco-song .index, .reco-song .artiste").animate({
              opacity: "1"
            //height: "110%"
          }, "slow", function() {
          
          });
			});
		
	}

	scope.blockReco=function(id){

  		if($rootScope.recomPlaylist.length == 1){
  			 scope.getRecommandation();
  			var index = $rootScope.recomPlaylist.indexOf(id);

		   }
		    $rootScope.recomPlaylist.splice(index);
		  	

		  	//$rootScope.block(id);
}



}
}
});

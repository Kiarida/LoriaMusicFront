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

	scope.getRecommandation=function(){
	
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
			});
		
	}



}
}
});

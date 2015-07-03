app.directive('myRecommandations', function(Auth, routeRessource, $resource, $timeout, $rootScope) {
  return {
    restrict: 'E',
    scope: {
            accessor: "="
        },

    link: function(scope, sce, rootScope, element, attrs){

	//var controller = this;
	//controller.algostrack=[];
	console.log("DIrecctuve");
	console.log(scope);
	if(scope.accessor){
		scope.accessor.getData=function(){
			return{
				name:"hey"
			}
		}
	}



	var Recommandations = $resource(routeRessource.Recommandations,{},
			{
		        'query': {
		            method: 'GET',
		            isArray: true,
		            headers: {
		              "Authorization" : 'WSSE profile="UsernameToken"',
		              "X-wsse" : Auth.getUser().wsse
		            },
		            params:{iduser:"@iduser"},
		        }
	        });

	scope.getRecommandation=function(){
		console.log("Recom");
		if($rootScope.radioMode){
			for(var i in $rootScope.currentUserTest[0].idgroup[0].idalgorithm){
				var algos = $rootScope.currentUserTest[0].idgroup[0].idalgorithm[i].nom;
				controller.algostrack.push(algos);
				controller.algostrack.algos.track=[];
				Recommandations.query({iduser:Auth.getUser().id, algorithm : algo},function(mess){
			//console.log(mess);
				
				mess[0][0].color={};
				mess[0][0].color.code=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].color;
				mess[0][0].color.name=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].label;
				algostrack.algos.track=mess[0][0];	
				console.log("rcommmmm !");	
		});
			}
		}
		else{
			var algo = $rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].nom

			Recommandations.query({iduser:Auth.getUser().id, algorithm : algo},function(mess){
				//console.log(mess);
				mess[0][0].color={};
				mess[0][0].color.code=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].color;
				mess[0][0].color.name=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].label;
				//$rootScope.playlist.push(mess[0][0]);
				console.log("Recommandations");
			});
		}
	}

	scope.$on('creationEcoute', function(event){ 
    		console.log("Création écoute")

       });

}
}
});

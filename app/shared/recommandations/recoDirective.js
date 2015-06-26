app.directive('recommandations', function(Auth, routeRessource, $resource, $timeout, $rootScope) {
  return {
    restrict: 'A',
    
    link: function(scope, sce, rootScope){

var controller = this;
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
	var algo = $rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].nom

	Recommandations.query({iduser:Auth.getUser().id, algorithm : algo},function(mess){
		//console.log(mess);
		mess[0][0].color={};
		mess[0][0].color.code=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].color;
		mess[0][0].color.name=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].label;
		$rootScope.playlist.push(mess[0][0]);
		
	});
}



}
}
});

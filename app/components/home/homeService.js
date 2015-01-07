app.factory('PaysFactory',['$http',"$q", function($http, $q){
	var factory = {
		countries : false,
		getCountries : function(){
			var deferred = $q.defer();
			if(factory.countries !== false){
				deferred.resolve(factory.countries);
			}
			else{
				$http.get('assets/data/countries.json')
					.success(function(data, status){
						factory.countries = data;
						deferred.resolve(factory.countries);
					}).error(function(data,status){
						deferred.reject('Error when retrieving the countries')
					})
			}
			return deferred.promise;
		}
	}
	return factory;
}]);

app.factory('Auth', function(){

	var user;

	return{
		setUser : function(aUser){
	    	user = aUser;
		},
		getUser : function(){
	    	return user;
		},
		isLoggedIn : function(){
			console.log(user);
	    	return(user)? user : false;
		}
		
	}
});
app.controller('historyController',function ($scope, $log) {
  

// Playlists to get

var history = [

    {
      id : 1,
      title : "La vie en rose"
    },

    {
      id : 2,
      title : "Dangerous"
    },
    {
      id : 3,
      title : "Cry me a river"
    }

  ];

  
   $scope.getHistoryTracks = function(){ 
    return history;
  }





});
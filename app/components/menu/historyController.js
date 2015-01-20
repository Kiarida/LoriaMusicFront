app.controller('historyController',function ($scope, $log,$sce) {
  

// Playlists to get

this.history = [

    {
      id : 1,
      sources: [
        {src: $sce.trustAsResourceUrl("http://b.rdb.so/d/JJXPDZ46WULAO/La%20Vie%20En%20Rose%20lyrics%20-%20Cristin%20Milioti.mp3"), type: "audio/mp3"}
      ],
      name: "La vie en rose",
      artiste : "Cristin Milioti",
      rate: 3,
      poster: "http://i.ytimg.com/vi/S8gL_7HjLGU/maxresdefault.jpg",
      tags:["test","rap"],
      cover: "http://lorempixel.com/200/200/",
    },
    {
      id : 12,
      sources: [
        {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
      ],
      name: "Dangerous",
      artiste : "David Guetta",
      rate: 3,
      poster: "http://www.videogular.com/assets/images/videogular.png",
      tags:["test","rap"],
      cover: "http://lorempixel.com/200/200/",
    },
    {
      id : 1,
      sources: [
        {src: $sce.trustAsResourceUrl("http://a.rdb.so/d/7YLYC3ZUMW6XY/Justin%20Timberlake%20-%20Cry%20Me%20A%20River%20%28Official%29.mp3"), type: "audio/mp3"}
      ],
      name: "Cry me a river",
      artiste : "Justin Timberlake",
      rate: 3,
      poster: "http://horrordisco.com/wp-content/uploads/2012/08/Justin-Timberlake.jpg",
      tags:["test","rap"],
      cover: "http://lorempixel.com/200/200/",
    },

  ];

  $scope.hoverHistory = false;

  
   $scope.getHistoryTracks = function(){ 
    return history;
  }





});
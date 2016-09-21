/**
 * Created by nwilson on 6/9/2015.
 */


(function(){
    //App definition
    var app = angular.module('denkoApp', []);
	
	//Filter to format time elements for weather
	app.filter('timeFilter', function() {
		return function(input){
			var output = input;
			var hour = output.substr(0, output.indexOf(":"));
			var suffix = 'AM';
			if(hour >12) {
				hour = hour - 12;
				suffix = 'PM';
			}
			//output = output.substr(0, output.indexOf(":"))
			//+ " " + output.substr(output.length -2, output.length);
			return hour + ' ' + suffix;
		}
	});
	
	app.filter('dowFilter', function() {
		return function(input){
			var dow = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			return dow[input];
		}
	});
	

    //Controller for all weather aspects
    app.controller('weatherController' , function($scope, $rootScope, $interval) {
		$rootScope.count = 0;
		$rootScope.imgCode = 0;
		$scope.Gorilla;
		var count = 0;
		$scope.alternate = $interval(function () {
			count++;
			count = count % 6;
			$rootScope.count = count;
			$rootScope.imgCode = Math.floor(Math.random() + $scope.Gorilla);
		}, 5000);
		
        socket.on('receiveWeather', function (data) {
            if(data.currently){
                $scope.weather = data;
				
                $scope.$apply();
                console.log('Updated weather information has been received');
            } else {
                console.log('Updated weather information is empty');
            }
        });
		
		socket.on('receiveGorilla', function(data){
			$scope.Gorilla = data / 100;
		});
    });

	app.controller('titleController', function($scope, $timeout){
		$scope.clock = "Loading clock...";

        //Updates the clock every second
        $scope.tick = function () {
            $scope.clock = Date.now();
            $timeout($scope.tick, 1000);
        };
		
	});
	
    //Controller for all information aspects
    app.controller('infoController', function($scope, $timeout){
        $scope.contacts = {};
        $scope.announcements = {};
		$scope.banner = {};
		$scope.index = 0;
        
        //Receives updated contacts
        socket.on('receiveContacts', function(data){
            if(data && data.length){
                $scope.contacts = data;
                $scope.$apply();
                console.log('Updated contacts have been received');
            } else {
                console.log('Updated contacts object is empty');
            }
        });
		
		//Receives banner
        socket.on('receiveBanner', function(data){
            if(data && data.length){
                $scope.banner = data;
				for(var i = 0; i < $scope.banner.length; i++){
					if(data[i].selected == true){
						$scope.index = i;
					}
				}
                $scope.$apply();
                console.log('Updated banner has been received');
            } else {
                console.log('Updated banner object is empty');
            }
        });

        //Receives updated announcements
        socket.on('receiveAnnouncements', function(data){
            if(data && data.length){
                $scope.announcements = data;
                $scope.$apply();
                console.log('Updated announcements have been received');
            } else {
                console.log('Updated announcements object is empty');
            }
        });
    });

    //Controller for all music aspects
    //TODO: add functionality for current music playing / list future
    app.controller('musicController', function($scope, $sce){
		$scope.musicSrc;
		$scope.songs = {};
		$scope.trustMusicSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}
		
		  socket.on('receiveSongs', function(data){
            if(data && data.length){
                $scope.songs = data;
                $scope.$apply();
                console.log('Updated songs has been received: ' + data.length);
            } else {
                console.log('Updated songs object is empty');
            }
		  });
		  socket.on('receiveCredentials', function(data){
			  $scope.musicSrc = data[3].musicSrc;
			  $scope.$apply();
			  
		  });
		/*
        $scope.songs = [
            { title: 'Summer', artist: 'Calvin Harris', albumArt: ''},
            { title: 'Detonate', artist: 'Netsky', albumArt: ''},
            { title: 'Fragile Earth', artist: 'UNQUOTE', albumArt: ''},
            { title: 'Green Destiny', artist: 'Fred V & Grafix', albumArt: ''},
            { title: 'Song in the Key of Knife', artist: 'London Elektricity', albumArt: ''},
            { title: 'Black Cloud', artist: 'Royalston', albumArt: ''},
            { title: 'Detroit', artist: 'Rockwell', albumArt: ''},
            { title: '1234', artist: 'Rockwell', albumArt: ''},
            { title: 'INeedU', artist: 'Rockwell', albumArt: ''},
            { title: 'Atlantis', artist: 'Enei', albumArt: ''}
        ]; 
		
		/*socket.on('receiveSongs', function(data) {
			console.log('GOT THEM');
		}); */
    });
	
	app.controller('memeController', function($scope){
		
	});
	
    //Controller for all news aspects
    app.controller('newsController', function($scope){
        $scope.news = {};

        //Receives updated news
        socket.on('receiveNews', function(data){
            if(data && data.length){
                $scope.news = data;
                $scope.$apply();
                console.log('Updated news has been received: ' + data.length);
            } else {
                console.log('Updated news object is empty');
            }
        });
    });
})();


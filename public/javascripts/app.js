angular.module('clickShame', [])
.factory('standingFactory', ['$http', function($http){
  var o = {};
  o.standings = [];
  o.getAll = function() {
    return $http.get('/standings').success(function(data){
      angular.copy(data, o.standings);
    });
  };
  o.getSet = function(domains) {
    return $http.get('/standings', domains).success(function(data){
      console.log(data);
      return data;
    });
  };
  return o;
}]).factory('strikeFactory', ['$http', 'standingFactory', function($http, standingFactory){
  var o = {};
  o.strikes = [];
  o.create = function(strike) {
    return $http.post('/strikes', strike).success(function(data){
      console.log('blah angular2');
      o.getAll();
      standingFactory.getAll();
    });
  };
  o.getAll = function() {
    return $http.get('/strikes').success(function(data){
      angular.copy(data, o.strikes);
    });
  };
  return o;
}]).controller('MainCtrl', [
'$scope',
'standingFactory',
'strikeFactory',
function($scope, standingFactory, strikeFactory){
  standingFactory.getAll();
  strikeFactory.getAll();
  $scope.standings = standingFactory.standings;
  $scope.strikes = strikeFactory.strikes;

  $scope.addStrike = function(){
    console.log('blah angular1');
    if(!$scope.url || $scope.url === '') { return; }
    strikeFactory.create({url: $scope.url});
    $scope.url = '';
  };

  $scope.checkStandings = function(){
    standingFactory.getSet([
        "http://buzzfeed.com/dorsey/turn-kanyes-frown-upside-down",
        "https://upworthy.com/salmon-crab-lobster-nothing-better-right-well-theres-a-dark-side-you-should-know-about",
        "http://www.reddit.com/r/todayilearned/comments/2u0z59/til_bill_paxton_is_the_only_actor_to_be_killed_by/",
        "https://www.facebook.com/gabriel.peery/posts/10155167228615501?comment_id=10155168939875501&notif_t=feed_comment_reply"
      ]);
  };
}]);


// angular.module('clickShame', [])
// .controller('MainCtrl', [
// '$scope',
// 'standings',
// function($scope, standings){
//   $scope.standings = standings.standings;

//   $scope.addStrike = function(){
//     if(!$scope.url || $scope.url === '') { return; }
//     standings.create({url: $scope.url});
//     $scope.url = '';
//   };
// }]);

// angular.module('clickShame', [])
// .factory('standings', [function(){
//   var o = {
//     standings: [
//       {"domain": "buzzfeed.com", "score": 900},
//       {"domain": "huffingtonpost.com", "score": 650},
//       {"domain": "blogstar.com", "score": 300},
//       {"domain": "blogwiz.com", "score": 250},
//       {"domain": "roudytown.com", "score": 200},
//     ]
//   };

//   o.create = function(post) {
//     return $http.post('/strikes', post).success(function(data){
//       o.getAll;
//     });
//   };

//   o.getAll = function() {
//     return $http.get('/standings').success(function(data){
//       angular.copy(data, o.standings);
//     });
//   };
//   return o;
// }]);

  // $scope.standings = [
    // {domain: "buzzfeed.com", score: 900},
    // {domain: "huffingtonpost.com", score: 650},
    // {domain: "blogstar.com", score: 300},
    // {domain: "blogwiz.com", score: 250},
    // {domain: "roudytown.com", score: 200},
  // ];
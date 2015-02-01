angular.module('clickShame', [])
.factory('domainFactory', ['$http', function($http){
  var o = {};
  o.domains = [];
  o.getAll = function() {
    return $http.get('/domains').success(function(data){
      angular.copy(data, o.domains);
    });
  };
  // o.getSet = function(domains) {
  //   return $http.get('/domains', domains).success(function(data){
  //     console.log(data);
  //     return data;
  //   });
  // };
  o.get = function(d) {
    console.log(d);
    return $http.get('/domain', {params: {"domain": d}}).success(function(data){
      console.log(data);
      return data;
    });
  };
  return o;
}]).factory('referenceFactory', ['$http', function($http){
  var o = {};
  o.references = [];
  o.getAll = function() {
    return $http.get('/references').success(function(data){
      angular.copy(data, o.references);
    });
  };
  o.get = function(r) {
    return $http.get('/reference', {params: {"reference": r}}).success(function(data){
      console.log(data);
      return data;
    });
  };
  return o;
}]).factory('strikeFactory', ['$http', 'domainFactory', 'referenceFactory', function($http, domainFactory, referenceFactory){
  var o = {};
  o.strikes = [];
  o.getAll = function() {
    return $http.get('/strikes').success(function(data){
      angular.copy(data, o.strikes);
    });
  };
  o.create = function(strike) {
    return $http.post('/strikes', strike).success(function(data){
      o.getAll();
      referenceFactory.getAll();
      domainFactory.getAll();
    });
  };
  return o;
}]).controller('MainCtrl', [
'$scope',
'domainFactory',
'referenceFactory',
'strikeFactory',
function($scope, domainFactory, referenceFactory, strikeFactory){
  domainFactory.getAll();
  referenceFactory.getAll();
  strikeFactory.getAll();
  $scope.domains = domainFactory.domains;
  $scope.references = referenceFactory.references;
  $scope.strikes = strikeFactory.strikes;

  $scope.createStrike = function(){
    if(!$scope.address || $scope.address === '') { return; }
    strikeFactory.create({address: $scope.address});
    $scope.address = '';
  };

  $scope.checkReferences = function(){
    standingFactory.getSet([
        "http://buzzfeed.com/dorsey/turn-kanyes-frown-upside-down",
        "https://upworthy.com/salmon-crab-lobster-nothing-better-right-well-theres-a-dark-side-you-should-know-about",
        "http://www.reddit.com/r/todayilearned/comments/2u0z59/til_bill_paxton_is_the_only_actor_to_be_killed_by/",
        "https://www.facebook.com/gabriel.peery/posts/10155167228615501?comment_id=10155168939875501&notif_t=feed_comment_reply"
      ]);
  };

  $scope.checkDomain = function(){
    domainFactory.get("www.buzzfeed.com");
  };

  $scope.checkReference = function(){
    referenceFactory.get("https://upworthy.com/salmon-crab-lobster-nothing-better-right-well-theres-a-dark-side-you-should-know-about");
  };

}]);

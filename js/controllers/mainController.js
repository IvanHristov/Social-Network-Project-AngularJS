app.controller('mainController', function ($scope, $location, mainData, authentication, notifyService) {

    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }

    authentication.isLogged(function (isLogged) {
        $scope.isLoggedIn = isLogged;
    });

    mainData.getNewsFeed(10)
        .success(function(serverData){
            $scope.loadData = serverData;
            console.log(serverData)
        }).error(function(error){
            console.log(error);
        })
});
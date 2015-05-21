app.controller('mainController', function ($scope, $location, mainData, authentication, DEFAULT_USER_AVATAR, notifyService) {

    $scope.defaultUserAvatar = DEFAULT_USER_AVATAR;

    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }


    $scope.hideFriendRequests = function(){
        $scope.showRequests = false;
    };

    $scope.showFriendRequests = function(){
      $scope.showRequests = true;
    };

    mainData.getNewsFeed(10)
        .success(function (serverData) {
            $scope.loadData = serverData;
            console.log($scope.loadData)
        }).error(function (error) {
            console.log(error);
        });

    mainData.getYourFriendsCount()
        .success(function(serverData){
            $scope.friendCount = serverData.totalCount;
        }).error(function (error) {
            console.log(error)
        });

    mainData.getYourFriends()
        .success(function (serverData) {
            $scope.friendInfo = serverData;
            console.log(serverData)
        }).error(function (error) {
            console.log(error)
        });

    authentication.getUserInfo()
        .success(function (data) {
            $scope.userInfo = data;
            console.log(data)
        }).error(function (error) {
            console.log(error)
        });

    mainData.getFriendRequests()
        .success(function (serverData) {
            $scope.friendRequests= serverData;
        }).error(function (error) {
            console.log(error)
        })
});
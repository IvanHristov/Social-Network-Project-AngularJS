app.controller('mainController', function ($scope, $location, mainData, authentication, postData, DEFAULT_USER_AVATAR, DEFAULT_USER_COVER_PHOTO, $routeParams, notifyService) {

    $scope.defaultUserAvatar = DEFAULT_USER_AVATAR;
    $scope.defaultUserCoverPhoto = DEFAULT_USER_COVER_PHOTO;
    $scope.hideFriendRequests = function () {
        $scope.showRequests = false;
    };

    $scope.postStatus = function () {
        var data = {
            postContent: $scope.postContent,
            username: $scope.currentProfileData.username
        };
        postData.addNewPost(data)
            .success(function (serverData) {
                $scope.currentProfileData.posts.push(serverData);
                $scope.currentProfileData.posts = $scope.currentProfileData.posts.sort(function (a, b) {
                    return b.id - a.id;
                });

            })
    };

    $scope.showFriendRequests = function () {
        $scope.showRequests = true;
    };

    $scope.showSearchMenu = function () {
        $scope.shownSearchMenu = true;
    };

    $scope.hideSearchMenu = function () {
        $scope.shownSearchMenu = false;
    };

    $scope.searchUserByName = function () {
        mainData.searchUsersByName($scope.search)
            .success(function (serverData) {
                $scope.foundUsers = serverData;

            })
            .error();
    };

    mainData.getNewsFeed(10)
        .success(function (serverData) {
            $scope.loadData = serverData;
        }).error(function (error) {
            console.log(error);
        });

    mainData.getYourFriendsCount()
        .success(function (serverData) {
            $scope.friendCount = serverData.totalCount;
        }).error(function (error) {
            console.log(error)
        });

    mainData.getYourFriends()
        .success(function (serverData) {
            $scope.friendInfo = serverData;
        }).error(function (error) {
            console.log(error)
        });

    authentication.getUserInfo()
        .success(function (data) {
            $scope.userInfo = data;
        }).error(function (error) {
            console.log(error)
        });

    mainData.getFriendRequests()
        .success(function (serverData) {
            $scope.friendRequests = serverData;
        }).error(function (error) {
            console.log(error)
        });

    if ($routeParams.username) {
        loadCurrentProfileData($routeParams.username);
    }

    function loadCurrentProfileData(username) {
        $scope.currentProfileData = {};

        mainData.getUserDataByUsername(username)
            .success(function (serverData) {
                $scope.currentProfileData = serverData;
                console.log(serverData)
                if (serverData.isFriend) {
                    mainData.getUserFriends(username)
                        .success(function (serverData) {
                            $scope.currentProfileData.friends = serverData;
                        });
                    mainData.getFriendFeed(username, '', 5)
                        .success(function (serverData) {
                            $scope.currentProfileData.posts = serverData;
                            $scope.currentProfileData.posts = $scope.currentProfileData.posts.sort(function (a, b) {
                                return b.id - a.id;
                            });
                        });
                }
            })
            .error(function () {

            });
    }
});
app.controller('mainController', function ($scope, $location, mainData, authentication, postData, DEFAULT_USER_AVATAR, DEFAULT_USER_COVER_PHOTO, $routeParams, notifyService) {

    $scope.defaultUserAvatar = DEFAULT_USER_AVATAR;
    $scope.defaultUserCoverPhoto = DEFAULT_USER_COVER_PHOTO;
    $scope.hideFriendRequests = function () {
        $scope.showRequests = false;
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

    $scope.acceptFriendRequest = function (id) {
        mainData.acceptFriendRequest(id)
            .success(function () {
                mainData.getFriendRequests()
                    .success(function (serverData) {
                        $scope.friendRequests = serverData;
                    }).error(function (error) {
                        console.log(error)
                    });
                $scope.friendRequests
                    .forEach(function (req) {
                        if (req.id === id) {
                            req.processed = true;
                        }
                    });
                mainData.getYourFriendsCount()
                    .success(function (serverData) {
                        $scope.friendTotal = serverData;
                    })
                    .error(function () {

                    });
            });
    };

    $scope.rejectFriendRequest = function (id) {
        mainData.rejectFriendRequest(id)
            .success(function () {

                mainData.getFriendRequests()
                    .success(function (serverData) {
                        $scope.friendRequests = serverData;
                    }).error(function (error) {
                        console.log(error)
                    });
                $scope.friendRequests
                    .forEach(function (req) {
                        if (req.id === id) {
                            req.processed = true;
                        }
                    });
            });
    };

    $scope.sendRequest = function sendRequest() {
        console.log($scope.currentProfileData);
        mainData.sentFriendRequest($scope.currentProfileData.username)
            .success(function () {
                $scope.currentProfileData.hasPendingRequest = true;
            });
    };

    $scope.profileOwner = $routeParams.username;
    $scope.myUserName = localStorage.username;

    $scope.getNewsFeed = function (startInx, PageSize) {
        mainData.getNewsFeed(startInx, PageSize)
            .success(function (serverData) {
                $scope.loadData = serverData;
            }).error(function (error) {
                console.log(error);
            });
    };


    mainData.getYourFriendsCount()
        .success(function (serverData) {
            $scope.friendTotal = serverData;
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
            console.log(data)
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
                $scope.currentProfileData.posts = [];
                mainData.getFriendFeed(username, '', 5)
                    .success(function (serverData) {
                        serverData.forEach(function (post) {
                            $scope.currentProfileData.posts.push(post);
                        });
                        $scope.currentProfileData.posts = $scope.currentProfileData.posts.sort(function (a, b) {
                            return b.id - a.id;
                        });
                    });
                if (serverData.isFriend) {
                    mainData.getUserFriends(username)
                        .success(function (serverData) {
                            $scope.currentProfileData.allFriends = serverData
                        });
                    mainData.getUserFriendsPageInfo(username)
                        .success(function (serverData) {
                            $scope.currentProfileData.friends = serverData;
                        });

                }
            })
            .error(function () {
                $location.path('/');
            });
    }

    $scope.loadFeed = function () {
        if ($scope.postLoading) {
            return;
        }
        if (!$routeParams.username) {
            var lastId = $scope.loadData[$scope.loadData.length - 1].id || '';
            $scope.postLoading = true;
            mainData.getNewsFeed(lastId, 5)
                .success(function (userFeed) {
                    $scope.postLoading = false;
                    userFeed.forEach(function (post) {
                        $scope.loadData.push(post);
                    });
                });
        } else {
            $scope.postLoading = true;
            mainData.getFriendFeed($routeParams.username, '', 5)
                .success(function (serverData) {
                    serverData.forEach(function (post) {
                        $scope.currentProfileData.posts.push(post);
                    });
                });
        }
    };

    $(document).ready(function () {
        $(window).scroll(function () {

            var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
            var scrolltrigger = 0.95;

            if ((wintop / (docheight - winheight)) > scrolltrigger) {
                $scope.loadFeed();
            }
        });
    });

});
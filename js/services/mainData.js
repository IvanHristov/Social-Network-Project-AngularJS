app.factory('mainData', function adsData($http, authentication, BASE_URL_SERVICE) {
    var data = {};

    data.getNewsFeed = function (PageSize) {
        return $http.get(BASE_URL_SERVICE + 'me/feed?PageSize=' + PageSize,
            {
                headers: authentication.getHeaders()
            });
    };


    data.searchUsersByName = function searchFriends(userName){
        return $http.get(
            BASE_URL_SERVICE + 'users/search?searchTerm=' + userName,
            {
                headers: authentication.getHeaders()
            }
        );
    };

    data.getUserFriendsPageInfo  = function getUserFriends(username){
        return $http.get(
            BASE_URL_SERVICE + 'users/' + username + '/friends/preview',
            {
                headers: authentication.getHeaders()
            }
        );
    };

    data.getUserFriends  = function getUserFriends(username){
        return $http.get(
            BASE_URL_SERVICE + 'users/' + username + '/friends',
            {
                headers: authentication.getHeaders()
            }
        );
    };

    data.getFriendFeed = function getUserFeed(username, startId, pageSize){
        return $http.get(
            BASE_URL_SERVICE + 'users/' + username + '/wall?PageSize=' + pageSize,
            {
                headers: authentication.getHeaders()
            }
        );
    };

    data.getUserDataByUsername = function getUserDataByUsername(username){
        return $http.get(
            BASE_URL_SERVICE + 'users/' + username,
            {
                headers: authentication.getHeaders()
            }
        );
    };

    data.getYourFriends = function () {
        return $http.get(BASE_URL_SERVICE + 'me/friends',
            {
                headers: authentication.getHeaders()
            })
    };

    data.getYourFriendsCount = function () {
        return $http.get(BASE_URL_SERVICE + 'me/friends/preview',
            {
                headers: authentication.getHeaders()
            })
    };

    data.getYourFriendFeed = function (username, StartPostId, PageSize) {
        return $http.get(BASE_URL_SERVICE + 'users/' + username + '/wall?&PageSize=' + PageSize,
            {
                headers: authentication.getHeaders()
            });
    };

    data.getFriendRequests = function(){
        return $http.get(BASE_URL_SERVICE + 'me/requests',
            {
                headers: authentication.getHeaders()
            });
    };
    data.sentFriendRequest = function(username){
        return $http({
            method: "POST",
            url: BASE_URL_SERVICE + 'me/requests/' + username,
            headers: authentication.getHeaders()
        })

    };

    data.acceptFriendRequest = function acceptFriendRequest(id){
        return $http({
            method: 'PUT',
            url: BASE_URL_SERVICE + 'me/requests/' + id + '?status=approved',
            headers: authentication.getHeaders()
        });
    };

    data.rejectFriendRequest = function rejectFriendRequest(id){
        return $http({
            method: 'PUT',
            url: BASE_URL_SERVICE + 'me/requests/' + id + '?status=rejected',
            headers: authentication.getHeaders()
        });
    };

    return data;
});
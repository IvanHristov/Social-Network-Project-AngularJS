app.factory('mainData', function adsData($http, authentication, BASE_URL_SERVICE) {
    var data = {};

    data.getNewsFeed = function (PageSize) {
        return $http.get(BASE_URL_SERVICE + 'me/feed?PageSize=' + PageSize,
            {
                headers: authentication.getHeaders()
            });
    };

    data.getYourFriendsCount = function () {
        return $http.get(BASE_URL_SERVICE + 'me/friends/preview',
            {
                headers: authentication.getHeaders()
            })
    };

    data.searchUsersByName = function searchFriends(userName){
        return $http.get(
            BASE_URL_SERVICE + 'users/search?searchTerm=' + userName,
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

    return data;
});
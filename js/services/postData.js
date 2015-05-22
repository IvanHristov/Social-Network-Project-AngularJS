app.factory('postData', function adsData($http, authentication, BASE_URL_SERVICE) {
    var data = {};

    var serviceUrl = BASE_URL_SERVICE + 'Posts';

    data.addNewPost = function(postData){
        return $http({
            method: "POST",
            url: serviceUrl,
            data: postData,
            headers: authentication.getHeaders()
        });
    };

    return data;
});
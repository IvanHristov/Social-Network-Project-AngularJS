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
    data.writePost = function(data){
        return $http({
            method: "POST",
            headers: authentication.getHeaders(),
            data: data,
            url: serviceUrl
        })

    };

    data.likePost = function likePost(postId){
        return $http({
            method: "POST",
            url: BASE_URL_SERVICE + 'Posts/' + postId + '/likes',
            headers: authentication.getHeaders()
        });
    };

    data.unlikePost = function unlikePost(postId){
        return $http({
            method: "DELETE",
            url: BASE_URL_SERVICE + 'Posts/' + postId + '/likes',
            headers: authentication.getHeaders()
        });
    };

    data.addCommentToPost = function addCommentToPost(postId, commentContent){
        var data = {
            commentContent: commentContent
        };
        return $http({
            url: BASE_URL_SERVICE + 'posts/' + postId + '/comments',
            method: "POST",
            headers: authentication.getHeaders(),
            data: data
        });
    };

    data.likeComment = function likeComment(postId, commentId){
        return $http({
            url: BASE_URL_SERVICE + 'posts/' + postId + '/comments/' + commentId + '/likes',
            method: "POST",
            headers: authentication.getHeaders()
        });
    };

    data.unlikeComment = function unlikeComment(postId, commentId){
        return $http({
            url: BASE_URL_SERVICE + 'posts/' + postId + '/comments/' + commentId + '/likes',
            method: "DELETE",
            headers: authentication.getHeaders()
        });
    };

    return data;
});
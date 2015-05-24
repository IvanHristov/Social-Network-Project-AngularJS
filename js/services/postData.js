app.factory('postData', function adsData($http, authentication, BASE_URL_SERVICE) {
    var data = {};

    var serviceUrl = BASE_URL_SERVICE + 'posts/';

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
    data.editPost = function editPost(post){
        var data = {
            postContent: post.postContent
        };
        return $http({
            url: serviceUrl + post.id,
            method: "PUT",
            data: data,
            headers: authentication.getHeaders()
        });
    };

    data.deletePost = function deletePost(postId){
        return $http({
            url: serviceUrl + postId,
            method: "DELETE",
            headers: authentication.getHeaders()
        });
    };

    data.deleteComment = function deleteComment(postId, commentId){
        return $http({
            url: serviceUrl + postId + '/comments/' + commentId,
            method: "DELETE",
            headers: authentication.getHeaders()
        });
    };

    data.editComment = function editComment(postId, comment){
        var data = {
            commentContent: comment.commentContent
        };

        return $http({
            url: serviceUrl + postId + '/comments/' + comment.id,
            method: "PUT",
            data: data,
            headers: authentication.getHeaders()
        });
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
            url: serviceUrl + postId + '/likes',
            headers: authentication.getHeaders()
        });
    };

    data.addCommentToPost = function addCommentToPost(postId, commentContent){
        var data = {
            commentContent: commentContent
        };
        return $http({
            url: serviceUrl + postId + '/comments',
            method: "POST",
            headers: authentication.getHeaders(),
            data: data
        });
    };

    data.likeComment = function likeComment(postId, commentId){
        return $http({
            url: serviceUrl + postId + '/comments/' + commentId + '/likes',
            method: "POST",
            headers: authentication.getHeaders()
        });
    };

    data.unlikeComment = function unlikeComment(postId, commentId){
        return $http({
            url: serviceUrl + postId + '/comments/' + commentId + '/likes',
            method: "DELETE",
            headers: authentication.getHeaders()
        });
    };
    data.getAllComments = function(postId){
        return $http({
            url: serviceUrl + postId + '/comments',
            method: "GET",
            headers: authentication.getHeaders()
        });
    };

    return data;
});
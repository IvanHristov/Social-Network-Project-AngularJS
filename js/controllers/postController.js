app.controller('postController', function ($scope, $location, mainData, authentication, $route, postData, $routeParams, notifyService) {

    $scope.writePost = function () {
        var data = {
            postContent: $scope.post.postContent,
            username: $scope.currentProfileData.username
        };
        postData.writePost(data)
            .success(function (serverData) {
                $scope.currentProfileData.posts.push(serverData);
                $scope.currentProfileData.posts = $scope.currentProfileData.posts.sort(function (a, b) {
                    return b.id - a.id;
                });
            });
        $scope.post.postContent = '';
    };


    $scope.likePost = function (post) {
        if (!post.liked) {
            postData.likePost(post.id)
                .success(function () {
                    post.liked = true;
                    post.likesCount++;
                })
                .error(function (error) {
                    console.log(error);
                });
        } else {
            postData.unlikePost(post.id)
                .success(function () {
                    post.liked = false;
                    post.likesCount--;
                });
        }
    };

    $scope.submitComment = function submitComment(post) {
        postData.addCommentToPost(post.id, post.unsubmitCommentContent)
            .success(function (serverData) {
                post.unsubmitCommentContent = '';
                post.comments.push(serverData);
                post.totalCommentsCount++;
            });
    };

    $scope.likeComment = function likeComment(postId, comment) {
        if (!comment.liked) {
            postData.likeComment(postId, comment.id)
                .success(function () {
                    comment.liked = true;
                    comment.likesCount++;
                });
        } else {
            postData.unlikeComment(postId, comment.id)
                .success(function () {
                    comment.liked = false;
                    comment.likesCount--;
                });
        }
    };

    $scope.editPost = function editPost(form, post) {

        if (form.$dirty) {
            postData.editPost(post)
                .success(function () {
                    notifyService.showInfo("Successful Edit Post!");
                    post.editing = false;
                }).error(function (error) {

                });
        }
    };

    $scope.deletePost = function deletePost(post) {
        postData.deletePost(post.id)
            .success(function () {
                if ($routeParams.username) {
                    notifyService.showInfo("Successful Delite Post!");
                    loadCurrentProfileData($routeParams.username);
                } else {
                    notifyService.showInfo("Successful Delite Post!");
                    $scope.getNewsFeed('',10);
                }
            }).error(function (error) {
                notifyService.showError('Unsuccessful Delite Post!', error);
            })
    };

    $scope.deleteComment = function deleteComment(postId, comment) {
        postData.deleteComment(postId, comment.id)
            .success(function () {
                if ($routeParams.username) {
                    notifyService.showInfo("Successful Delite Comment!");
                    $route.reload()
                } else {
                    notifyService.showInfo("Successful Delite Comment!");
                    $scope.getNewsFeed('',10);
                }
            });
    };

    $scope.editComment = function editComment(postId, comment) {
        postData.editComment(postId, comment)
            .success(function () {
                comment.editing = false;
                notifyService.showInfo("Successful Edit Comment!");

            }).error(function (error) {
                notifyService.showError("Unsuccessful Edit Comment!")
            })
    };

});
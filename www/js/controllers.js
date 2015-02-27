angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.communities');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('DashCtrl', function($scope) {})

.controller('CommunitiesCtrl', ['$scope', '$http', '$ionicModal',  function($scope, $http, $ionicModal) {

 $scope.communities = [];
 $scope.newCommunity = function(){
  $scope.communityModal.show();
 }
  // $scope.addCommunity = function() {
  // var myCommunity = $ionicPopup.show({
  //   template:'Hey this is going to work!'
  //   scope: $scope,
  //   })
  // }

// Modal for the form
  // $ionicModal.fromTemplateUrl('my-modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  
 $ionicModal.fromTemplateUrl('add-community.html', function(modal) {
    $scope.communityModal = modal;
  }, {
    scope: $scope
  });

  $scope.openModal = function() {
    $scope.communityModal.show();
  };
  
  $scope.closeModal = function() {
    $scope.communityModal.hide();
  };
  
  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });

  $http.get('http://localhost:3000/api/communities').then(function(response){
    console.log('Success', response);
    $scope.communities = response.data;
    console.log($scope.communities);

  }, function(err){
    console.log('ERR', err);
  })

}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

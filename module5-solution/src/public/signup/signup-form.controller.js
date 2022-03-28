(function () {
"use strict";

angular.module('public')
.controller('SignUpFormController', SignUpFormController);

SignUpFormController.$inject = ['MenuService', 'UserService'];
function SignUpFormController(MenuService, UserService) {
  var $ctrl = this;

  $ctrl.completed = false;
  $ctrl.favouriteDish = true;

  $ctrl.submit = function () {

    MenuService.getMenuItem($ctrl.user.favouriteDish).then(
      function(responseData){
        if(responseData.id){
          UserService.saveUserInfo($ctrl.user.firstname, $ctrl.user.lastname, $ctrl.user.email, $ctrl.user.phone, $ctrl.user.favouriteDish);

          $ctrl.favouriteDish = true;
          $ctrl.completed = true;
        }
        else {
            $ctrl.favouriteDish = false;
        }
      }
    )
    .catch(function (error) {
      $ctrl.favouriteDish = false;
      console.log(error);
    });
  };
}

})();

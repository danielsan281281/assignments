(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['menuItems'];
function SignUpController(menuItems) {
  var $ctrl = this;
  $ctrl.menuItems = menuItems;
}

})();

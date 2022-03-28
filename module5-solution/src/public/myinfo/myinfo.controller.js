(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['ApiPath', 'userInfo'];
function MyInfoController(ApiPath, userInfo) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  $ctrl.userInfo = userInfo;
}

})();

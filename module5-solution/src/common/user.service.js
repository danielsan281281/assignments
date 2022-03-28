(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$q', 'ApiPath'];
function UserService($q, ApiPath) {
  var service = this;

  var userInfo;

  service.saveUserInfo = function (firstname, lastname, email, phone, favouriteDish) {
    userInfo = {
      "firstname" : firstname,
      "lastname" : lastname,
      "email" : email,
      "phone" : phone,
      "favouriteDish" : {
        "shortName": favouriteDish.short_name,
        "name": favouriteDish.name,
        "description": favouriteDish.description
      }
    }
  };

  service.getUserInfo = function () {
    var deferred = $q.defer();

    deferred.resolve(userInfo);

    return deferred.promise;
  };

}

})();

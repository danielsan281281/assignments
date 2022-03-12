(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: NarrowItDownDirectiveLink
  };

  return ddo;
}

function NarrowItDownDirectiveLink(scope, element, attrs, controller) {

  scope.$watch('list.items.length', function (newValue, oldValue) {

    if (oldValue != 0 && newValue == 0) {
      var warningElem = element.find("div.error");
      warningElem.slideDown(900);
    }
    else {
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);
    }

  });
}

function NarrowItDownDirectiveController() {

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.findItem = function (itemName) {
    if(itemName){
      var promise = MenuSearchService.getMatchedMenuItems(itemName);

      promise.then(function (foundItems) {
        list.found = foundItems;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }
    else {
        list.found = [];
    }
  };

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var menuItems = result.data.menu_items;
      var foundItems = [];

      for (var i = 0; i < menuItems.length; i++) {
        var description = menuItems[i].description;
        if (description.indexOf(searchTerm) !== -1) {
            foundItems.push(menuItems[i]);
        }
      }

      return foundItems;
    });
  };
}

})();

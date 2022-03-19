(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/restaurant/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();

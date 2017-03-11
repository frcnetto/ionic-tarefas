// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function($scope, $ionicPopup){
  var tasks = new getTasks();

  $scope.lista = tasks.items;
  $scope.listaFinalizada = tasks.itemsFinalizados;
  $scope.showCheckedTasks = true;
  $scope.showReorder = false;
  $scope.showRemove = false;

  function newTaskPopup(item, newItem) {
    $scope.data = {};
    $scope.data.newTask = item.nome;

    $ionicPopup.show({
      title: 'Novo lembrete',
      subTitle: 'Lembre-me de:',
      template: '<input type="text" placeholder="Tarefa..." autofocus="true" ng-model="data.newTask"/>',
      scope: $scope,
      buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>Salvar</b>',
        type: 'button-energized',
        onTap: function(e) {
          item.nome = $scope.data.newTask;
          if (newItem){
            tasks.add(item);
            tasks.save();
          } else {
            tasks.save();
          }
        }
      }
      ]
    });
  }

  function deleteTaskPopup(item) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Apagar tarefa',
      template: 'Você tem certeza que quer apagar esta tarefa?',
      buttons: [
      {text:'Cancelar'},
      {
        text: '<b>Apagar</b>',
        type: 'button-energized',
        onTap: function (e) {
          if (item.status == false) {
            tasks.remove(item);
          } else {
            tasks.removeFinal(item);
          }
          tasks.save();
        }
      }
      ]
    });
  };

  $scope.onShowCheckedItem = function (item) {
    return item.status && !$scope.showCheckedTasks;
  };

  $scope.onShowReorder = function () {
    $scope.showReorder = !$scope.showReorder;
  };

  $scope.onShowRemove = function () {
    $scope.showRemove = !$scope.showRemove;
  };

  $scope.onCheckedItem = function (item) {
    if (item.status == true) {
      tasks.addFinal(item);
      tasks.remove(item);
    } else {
      tasks.add(item);
      tasks.removeFinal(item);
    }
    tasks.save();
  };

  $scope.onDeleteTask = function (item) {
    deleteTaskPopup(item);
  };

  // $scope.onMoveTask = function(item, fromIndex, toIndex) {
  //   if (item.status == true) {
  //     tasks.move(item, fromIndex, toIndex);
  //   } else {
  //     tasks.moveFinal(item, fromIndex, toIndex);
  //   }
  //   tasks.save();
  // };

  $scope.onAddTask = function () {
    var item = {nome:'', status:false};
    newTaskPopup(item, true);
  };

  $scope.onEditTask = function (item) {
    newTaskPopup(item, false);
  };
});
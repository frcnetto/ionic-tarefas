function getTasks(){
	this.items = [];
	this.itemsFinalizados = [];

	var lista = localStorage.getItem("taskList");
	var listaFinalizada = localStorage.getItem("taskListFinal");

	if (lista !== null)
		this.items = angular.fromJson(lista);

	if (listaFinalizada !== null)
		this.itemsFinalizados = angular.fromJson(listaFinalizada);

	this.save = function () {
		var lista = angular.toJson(this.items);
		localStorage.setItem("taskList", lista);
		
		var listaFinalizada = angular.toJson(this.itemsFinalizados);
		localStorage.setItem("taskListFinal", listaFinalizada);
	}

	this.remove = function removeTask(item){
		var pos = this.items.indexOf(item);
		this.items.splice(pos, 1);
	};

	this.move = function(item, fromIndex, toIndex) {
		this.items.splice(fromIndex, 1);
		this.items.splice(toIndex, 0, item);
	};

	this.add = function (item) {
		this.items.push(item);
	}

	this.removeFinal = function(item){
		var pos = this.itemsFinalizados.indexOf(item);
		this.itemsFinalizados.splice(pos, 1);
	};

	this.moveFinal = function(item, fromIndex, toIndex) {
		this.itemsFinalizados.splice(fromIndex, 1);
		this.itemsFinalizados.splice(toIndex, 0, item);
	};

	this.addFinal = function (item) {
		this.itemsFinalizados.push(item);
	}
}
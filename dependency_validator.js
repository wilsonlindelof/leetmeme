var validate = function(input) {
	if ('undefined' === typeof input || input.constructor != Array) {
		return 'INVALID - NOT AN ARRAY';
	}
	
	var dependency_map = {};
	for (var i = 0; i < input.length; i++) {//input is of type = [ "Leetmeme: Ice", "Ice: KittenService" ]
		var dependency = input[i];
		var package = dependency.split(": ")[0];
		//var dependent = dependency.split(": ")[1];
		dependency_map[package] = 'NO_DEPENDENT';
	}
	
	var dependents = Object.keys(dependency_map);
	var result = "";
	for (var i = 0; i < dependents.length; i++) {
		result += dependents[i] + ', ';
	}
	
	return result.substring(0, result.length - 2);//to remove the ', ' from the last entry
	
};

var DependencyValidator = {
	validate: validate
};

module.exports = DependencyValidator;
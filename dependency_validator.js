var validate = function(input) {
	if ('undefined' === typeof input || input.constructor != Array) {
		return 'INVALID - NOT AN ARRAY';
	}
	
	var dependency_map = {};
	for (var i = 0; i < input.length; i++) {//input is of type = [ "Leetmeme: Ice", "Ice: KittenService" ]
		var dependency = input[i];
		var package = dependency.split(": ")[0];
		var dependent = dependency.split(": ")[1];
		if (dependent.length > 0) {//there is a dependent			
			dependency_map[package] = dependent;
		} else {
			dependency_map[package] = 'NO_DEPENDENT';
		}		
		
	}
	
	var dependents = Object.keys(dependency_map);
	var result = "";//it should be ordered so the ones with no dependents go first, then the ones that depend on them, etc
	var added = [];
	for (var i = 0; i < dependents.length; i++) {
		var package = dependents[i];
		if (dependency_map[package] == 'NO_DEPENDENT') {
			result += package + ', ';
			added.push(package);
		}		
	}
	
	while (added.length < dependents.length) {//keep going until they have all been added. This could also be done with recursion
		for (var i = 0; i < dependents.length; i++) {
			var package = dependents[i];
			var dependent = dependency_map[package];
			
			if (added.indexOf(package) == -1) {//dont re-add a package
				if (added.indexOf(dependent) != -1) {//if the package's dependency has been added already, its ready to add
					result += package + ', ';
					added.push(package);
				}
			}		
		}
	}
	
	
	return result.substring(0, result.length - 2);//to remove the ', ' from the last entry
	
};

var DependencyValidator = {
	validate: validate
};

module.exports = DependencyValidator;
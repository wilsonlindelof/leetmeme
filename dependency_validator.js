var validate = function(input) {
	if ('undefined' === typeof input || input.constructor != Array) {
		return 'INVALID - NOT AN ARRAY';
	}
	return input;
};

var DependencyValidator = {
	validate: validate
};

module.exports = DependencyValidator;
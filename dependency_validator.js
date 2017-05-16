var validate = function(input) {
	if ('undefined' === typeof input || input.constructor != Array) {
		return 'INVALID';
	}
	return input;
};

var DependencyValidator = {
	validate: validate
};

module.exports = DependencyValidator;
var expect = require('chai').expect;

describe('DependencyValidator', function() {
	it('exists', function() {
		var DependencyValidator = require('./dependency_validator.js');
		expect(DependencyValidator).to.not.be.undefined;
	});
});

describe('DependencyValidator', function() {
	it('takes input', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate('some input string');
		expect(result).to.not.be.undefined;
	});
});
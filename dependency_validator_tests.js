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

describe('DependencyValidator', function() {
	it('validates its a array of strings', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate('some input string');
		expect(result).to.equal('INVALID');
		
		result = DependencyValidator.validate(58934);
		expect(result).to.equal('INVALID');
		
		result = DependencyValidator.validate({'some': 'object'});
		expect(result).to.equal('INVALID');
		
		result = DependencyValidator.validate();
		expect(result).to.equal('INVALID');
	});
});
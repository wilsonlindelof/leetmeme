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
	it('validates its an array of strings', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate('some input string');
		expect(result).to.equal('INVALID - NOT AN ARRAY');
		
		result = DependencyValidator.validate(58934);
		expect(result).to.equal('INVALID - NOT AN ARRAY');
		
		result = DependencyValidator.validate({'some': 'object'});
		expect(result).to.equal('INVALID - NOT AN ARRAY');
		
		result = DependencyValidator.validate();
		expect(result).to.equal('INVALID - NOT AN ARRAY');
		
		result = DependencyValidator.validate(["Leetmeme: "]);
		expect(result).to.not.equal('INVALID - NOT AN ARRAY');
	});
});

describe('DependencyValidator', function() {
	it('returns a strings list', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["Leetmeme: Ice", "Ice: Leetmeme"]);
		expect(result).to.be.a('string');		
	});
});

describe('DependencyValidator', function() {
	it('correctly returns lists with no dependencies', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: ", "CamelCaser: "]);
		expect(result).to.be.a('string');		
		expect(result).to.be.oneOf(['KittenService, CamelCaser', 'CamelCaser, KittenService']);//either should be valid without any dependencies and no instructions requiring alphabetical sorting
	});
});

describe('DependencyValidator', function() {
	it('correctly returns simple dependencies', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: CamelCaser", "CamelCaser: "]);
		expect(result).to.be.a('string');		
		expect(result).to.equal('CamelCaser, KittenService');
	});
});

describe('DependencyValidator', function() {
	it('rejects circular references', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["Leetmeme: Ice", "Ice: Leetmeme"]);
		expect(result).to.equal('INVALID - CIRCULAR REFERENCE');				
	});
});
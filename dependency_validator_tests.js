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
		var result = DependencyValidator.validate(["Leetmeme: Ice", "Ice: "]);
		expect(result).to.be.a('string');		
	});
});

describe('DependencyValidator', function() {
	it('correctly returns lists with no dependencies', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: ", "CamelCaser: "]);				
		expect(result).to.be.oneOf(['KittenService, CamelCaser', 'CamelCaser, KittenService']);//either should be valid without any dependencies and no instructions requiring alphabetical sorting
	});
});

describe('DependencyValidator', function() {
	it('correctly returns simple dependencies', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: CamelCaser", "CamelCaser: "]);		
		expect(result).to.equal('CamelCaser, KittenService');
	});
});

describe('DependencyValidator', function() {
	it('correctly returns more nested dependencies', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: CamelCaser", "CamelCaser: Ice", "Leetmeme: ", "Ice: Leetmeme"]);		
		expect(result).to.equal('Leetmeme, Ice, CamelCaser, KittenService');
	});
});

describe('DependencyValidator', function() {
	it('correctly returns the explicitly defined valid input example 2 milestone', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: ", "Leetmeme: Cyberportal", "Cyberportal: Ice", "CamelCaser: KittenService", "Fraudstream: Leetmeme", "Ice: "]);		
		expect(result).to.be.oneOf(['KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream',
		'Ice, KittenService, Cyberportal, Leetmeme, CamelCaser, Fraudstream',
		'KittenService, Ice, Cyberportal, CamelCaser, Leetmeme, Fraudstream',
		'Ice, KittenService, Cyberportal, CamelCaser, Leetmeme, Fraudstream',
		'KittenService, Ice, CamelCaser, Cyberportal, Leetmeme, Fraudstream',
		'Ice, KittenService, CamelCaser, Cyberportal, Leetmeme, Fraudstream',]);
	});//there are actually many valid configurations for this test. 
	//I left it liket his with Ice and KittenService up front since they both have no dependencies, 
	//but technically as long as the only constraint is to have the order such that a package's dependency precedes the package, 
	//even something like "Ice, Cyberportal, Leetmeme, Fraudstream, KittenService, CamelCaser" would be technically valid. 
	//tricky... to get a full test suite you would either need a lot of permutations or replicating some of the logic in the test suite.
});

describe('DependencyValidator', function() {
	it('rejects circular references', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["Leetmeme: Ice", "Ice: Leetmeme"]);
		expect(result).to.equal('INVALID - CIRCULAR REFERENCE');				
	});
});

describe('DependencyValidator', function() {
	it('correctly rejects the explicitly defined invalid input example', function() {
		var DependencyValidator = require('./dependency_validator.js');
		var result = DependencyValidator.validate(["KittenService: ", "Leetmeme: Cyberportal", "Cyberportal: Ice", "CamelCaser: KittenService", "Fraudstream: Leetmeme", "Ice: Leetmeme"]);
		expect(result).to.equal('INVALID - CIRCULAR REFERENCE');				
	});
});
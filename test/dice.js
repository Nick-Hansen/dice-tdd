var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var mockery = require('mockery');
var expect = chai.expect;
var dice;
chai.use(sinonChai);


describe('Test for dice module', function() {

	var randomStub;

	before(function() {
		mockery.enable({
			warnOnReplace: false,
			warnOnRunregistered: false,
			useCleanCache: true
		});

		randomStub = sinon.stub().returns(0.99999);

		mockery.registerMock('./randomHelper', randomStub);

		dice = require('../dice');
	});

	after(function() {
		mockery.disable();
	});

	it('Should be a number within a valid range when rolled', function() {
		expect(dice.roll()).to.be.within(1,6);
	});

	it('Should use a random number', function() {
		callCount = randomStub.callCount;

		dice.roll();

		expect(randomStub.callCount).to.equal(callCount + 1);

	});

	it('Should not be a decimal number', function() {
		expect(dice.roll() % 1).to.equal(0);
	});

	it('Should take a parameter to use as max value', function() {
		var maxRoll = 12;
		expect(dice.roll(maxRoll)).to.equal(maxRoll);
	});

  it('Should show a list of rolls when rollHistory is called', function() {
    var previousHistoryCount = dice.rollHistory().length;
    dice.roll();
    expect(dice.rollHistory().length).to.equal(previousHistoryCount + 1);
  });

  it('Should clear the history when clearHistory is called', function() {
    dice.roll();
    dice.clearHistory();
    expect(dice.rollHistory().length).to.equal(0);
  })

})
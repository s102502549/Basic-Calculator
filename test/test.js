var assert = require('assert');
var cal = require('../calculator.js')

describe('test Caculator protype function', function () {
    describe('good user', function () {
        describe('test isValidExpression()', function () {
            it('2+3  (simple)', function () {
                assert.equal(true, cal.isValidExpression("2+3"));
            })
            it('+3+2  (head operator)', function () {
                assert.equal(true, cal.isValidExpression("+3+2"));
            })
            it('2×+3  (repeat operator)', function () {
                assert.equal(true, cal.isValidExpression("2×+3"));
            })
            it('2×.3  (short dot)', function () {
                assert.equal(true, cal.isValidExpression("2×+3"));
            })
            it('2+3-2%×13÷100  (complex)', function () {
                assert.equal(true, cal.isValidExpression("2+3-2%×13÷100"));
            })
            it('2%%-3%+4%%%  (many %)', function () {
                assert.equal(true, cal.isValidExpression("2%%-3%+4%%%"));
            })
        })
        describe('test calculate()', function () {
            it('2+3  (simple)', function () {
                assert.equal("5", cal.calculate("2+3"));
            })
            it('2+3-2%×13÷100  (complex)', function () {
                assert.equal("4.9974", cal.calculate("2+3-2%×13÷100"));
            })
            it('2%%-3%+4%%%  (many %)', function () {
                assert.equal("-0.029796", cal.calculate("2%%-3%+4%%%"));
            })
            it('99999999×12345678  (big)', function () {
                assert.equal("1.234567788e+15", cal.calculate("99999999×12345678"));
            })
            it('0.123456789×0.004321  (small)', function () {
                assert.equal("5.334567853e-4", cal.calculate("0.123456789×0.004321"));
            })
            it('00.23+00.24  (leading zero)', function () {
                assert.equal("0.47", cal.calculate("00.23+00.24"));
            })
            it('002.35+2.001  (leading zero)', function () {
                assert.equal("4.351", cal.calculate("002.35+2.001"));
            })
        })
    })
    describe('garbage user', function () {
        describe('test isValidExpression()', function () {
            it('×2+3  (head operator)', function () {
                assert.equal(false, cal.isValidExpression("2+3.+2"));
            })
            it('2+  (lack of operand)', function () {
                assert.equal(false, cal.isValidExpression("2+"));
            })
            it('2+3.+2  (lack of operand)', function () {
                assert.equal(false, cal.isValidExpression("2+3.+2"));
            })
            it('2%.3+2  (%.)', function () {
                assert.equal(false, cal.isValidExpression("2%.3+2"));
            })
            it('2%+4%%+%+2%  (lack of operand)', function () {
                assert.equal(false, cal.isValidExpression("2%+4%%+%+2%"));
            })
            it('2++3  (repeat operator)', function () {
                assert.equal(false, cal.isValidExpression("2++3"));
            })
            it('2%3  (lack of operator)', function () {
                assert.equal(false, cal.isValidExpression("2%3"));
            })
            it('2..3  (repeat dot)', function () {
                assert.equal(false, cal.isValidExpression("2..3"));
            })
        })
        describe('test calculate()', function () {
            it('2+  (error)', function () {
                assert.equal("error", cal.calculate("2+"));
            })
            it('2+3-2%×13÷100%3  (error)', function () {
                assert.equal("error", cal.calculate("2+3-2%×13÷100%3"));
            })
            it('  (empty)', function () {
                assert.equal("", cal.calculate(""));
            })
            it('9e50×9e50  (out of range)', function () {
                assert.equal("error", cal.calculate("9e50×9e50"));
            })
            it('-9e50×-9e50  (out of range)', function () {
                assert.equal("error", cal.calculate("-9e50×-9e50"));
            })
        })
    })
})

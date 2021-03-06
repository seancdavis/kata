// ---------------------------------------- | Setup

const chai = require('chai')
const assert = chai.assert

// ---------------------------------------- | Tests

const tests = {
  filterList: function(name, fn) {
    describe(`[1906] ${name.toUpperCase()}: filterList()`, () => {
      it('should return an array', () => {
        assert.typeOf(fn.filterList(['a']), 'array')
      })

      it('should return only numbers', () => {
        const results = fn.filterList(['a', 1, 2, 'waffles'])
        results.every(el => assert.typeOf(el, 'number'))
      })

      it('should satisfy test case #1', () => {
        const results = fn.filterList([1, 2, 'a', 'b'])
        assert.sameMembers(results, [1, 2])
      })

      it('should satisfy test case #2', () => {
        const results = fn.filterList([1, 'a', 'b', 0, 15])
        assert.sameMembers(results, [1, 0, 15])
      })

      it('should satisfy test case #3', () => {
        const results = fn.filterList([1, 2, 'aasf', '1', '123', 123])
        assert.sameMembers(results, [1, 2, 123])
      })
    })
  },

  duplicateEncode: function(name, fn) {
    describe(`[1906] ${name.toUpperCase()}: duplicateEncode()`, () => {
      it('should return a string', () => {
        assert.typeOf(fn.duplicateEncode('din'), 'string')
      })

      it('should satisfy test case #1', () => {
        assert.equal(fn.duplicateEncode('din'), '(((')
      })

      it('should satisfy test case #2', () => {
        assert.equal(fn.duplicateEncode('recede'), '()()()')
      })

      it('should satisfy test case #3', () => {
        assert.equal(fn.duplicateEncode('Success'), ')())())')
      })

      it('should satisfy test case #4', () => {
        assert.equal(fn.duplicateEncode('(( @'), '))((')
      })
    })
  },
}

// ---------------------------------------- | Run Tests

const solutions = require('./test-cases')

for (let test of Object.keys(solutions)) {
  for (let dev of solutions[test]) {
    const fl = require(`./solutions/${dev}`)
    tests[test](dev, fl)
  }
}

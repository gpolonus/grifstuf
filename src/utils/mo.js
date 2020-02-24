
const memoized = require('memoize-one')

const isoMemoized = memoized.default ? memoized.default : memoized

const truth = () => true

module.exports = f => isoMemoized(f, truth)

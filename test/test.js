var path = require('path')
var jsdom = require('jsdom')
var fs = require('fs')

require('./topology.test.js')

jsdom.env({
  html:''
, features: {QuerySelector: true}
, done: function (err, window) {

    window.d3 = require('d3').select(window.document)
    d3 = window.d3
    document = window.document
    
    fs.readdir(__dirname, function (err, d) {
      d.filter(function (f) {
        return /.*\.test\.js/.test(f)
      }).forEach(function (f) {
        var t = require(path.join(__dirname, f))
        if (typeof t === 'function') {
          t(window, d3)
        }
      })
    }) 
  }
})

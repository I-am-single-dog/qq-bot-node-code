var SendMessage = require('./SendMessage/index')
var HandleMessage = require('./HandleMessage/index')
var GetMessage = require('./GetMessage/index')

module.exports=Object.assign(SendMessage, HandleMessage, GetMessage)
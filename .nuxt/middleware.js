const middleware = {}

middleware['acl'] = require('../src/middleware/acl.js')
middleware['acl'] = middleware['acl'].default || middleware['acl']

middleware['authorization'] = require('../src/middleware/authorization.js')
middleware['authorization'] = middleware['authorization'].default || middleware['authorization']

middleware['userAgent'] = require('../src/middleware/userAgent.js')
middleware['userAgent'] = middleware['userAgent'].default || middleware['userAgent']

export default middleware

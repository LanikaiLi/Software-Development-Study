const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] // get the token from the headers
  if (!token) return res.status(401).json({ error: 'No token provided' }) // if no token, return 401

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // verify the token
    req.userId = decoded.userId // set the user id to the request
    next() // call the next middleware
  } catch {
    res.status(401).json({ error: 'Invalid token' }) // if invalid token, return 401
  }
}

module.exports = requireAuth
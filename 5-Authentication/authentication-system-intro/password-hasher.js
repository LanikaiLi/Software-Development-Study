// this is how companies like facebook, google, etc. store passwords in their databases, they never store the password itself, they store the hash of the password and compare it to the hash of the password they receive from the user to verify if the password is correct

const crypto = require("crypto")

const input = process.argv[2]

const hash = crypto.createHash("sha256").update(input).digest("hex")

console.log(hash)
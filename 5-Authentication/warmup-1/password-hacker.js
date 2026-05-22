// !!! DATA BREACH !!! //
// For this warmup, I'm asking you to put yourself in the shoes of a malicious hacker. Your goal is to steal my password.

const crypto = require("crypto")

// This function takes in a string, and returns a hashed version of it:
const hashString = (string) => {
    return crypto.createHash("sha256").update(string).digest("hex")
}

// For example, hashString("potato") returns this:
// e91c254ad58860a02c788dfb5c1a65d6a8846ab1dc649631c7db16fef4af2dec
// This is called a derived key.

// Every time we hash the string "potato" we'll get that exact same result.

// In a recent data breach, you were able to obtain some information about my secret password. Turns out it's a very weak password: it's only five characters long, and every character is a number. When you run my password through the hashString function, you get this derived key:

// b83c588da0c6931625f42e0948054a3ade722bfd02c27816305742ed7390ac6c

// What is my password?

// my logic: loo through all combinations of 5 numbers and hash them, if the hash is the same as the given hash, then return the password

const password = (hash) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                for (let l = 0; l < 10; l++) {
                    for (let m = 0; m < 10; m++) {
                        const password = `${i}${j}${k}${l}${m}`
                        const hashedPassword = hashString(password)
                        if (hashedPassword === hash) {
                            return password
                        }
                    }
                }
            }
        }
    }
}

console.log(password("b83c588da0c6931625f42e0948054a3ade722bfd02c27816305742ed7390ac6c"))
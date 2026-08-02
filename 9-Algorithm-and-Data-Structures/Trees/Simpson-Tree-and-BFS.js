// The following data structure is a TREE. Nodes on the tree represent individual members of a family, with pointers to their mother and their father.

const abe = { name: "Abe Simpson", mother: null, father: null }
const mona = { name: "Mona Simpson", mother: null, father: null }
const jacqueline = { name: "Jacqueline Bouvier", mother: null, father: null }
const clancy = { name: "Clancy Bouvier", mother: null, father: null }

const homer = { name: "Homer Simpson", mother: mona, father: abe }
const marge = { name: "Marge Simpson", mother: jacqueline, father: clancy }
const patty = { name: "Patty Bouvier", mother: jacqueline, father: clancy }
const selma = { name: "Selma Bouvier", mother: jacqueline, father: clancy }

const bart = { name: "Bart Simpson", mother: marge, father: homer }
const lisa = { name: "Lisa Simpson", mother: marge, father: homer }
const maggie = { name: "Maggie Simpson", mother: marge, father: homer }

// 1. Find ancestor: write a function that takes in a person and a name (ie, lisa and "Abe Simpson"), then searches and returns Lisa's ancestor with that name, or null if no such ancestor exists.

const findAncestor = (person, targetName) => {
	const queue = []

	if (person.mother) { queue.push(person.mother) }
	if (person.father) { queue.push(person.father) }
	
	while (queue.length) {
		const currentPerson = queue.shift()
		if (currentPerson.name === targetName) {
			return currentPerson
		}
		if (currentPerson.mother) { queue.push(currentPerson.mother) }
		if (currentPerson.father) { queue.push(currentPerson.father) }
	}

	return null
}

console.log(findAncestor(lisa, "Abe Simpson"))

// 2. Are they siblings? Write a function that checks whether two people are full siblings.

// 3. Find common ancestor. Given two people, return the name of their closest common ancestor (or one of their two closest common ancestors). For example, for Patty and Bart, the closest common ancestor would be either Clancy or Jacqueline.
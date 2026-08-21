//Warmup:

/* Given the following data object, write a function that returns a string of sentences in this format: "Elizabeth I was Queen from 1558 - 1603. James I was King from 1603 - 1625" */

const monarchs = [
    { name: 'Henry VIII', title: 'King', start: 1509, reignLength: 38 },
    { name: 'Edward VI', title: 'King', start: 1547, reignLength: 6 },
    { name: 'Mary I', title: 'Queen', start: 1553, reignLength: 5 },
    { name: 'Elizabeth I', title: 'Queen', start: 1558, reignLength: 45 },
    { name: 'James I', title: 'King', start: 1603, reignLength: 22 },
]

const getMonarchs = (monarchs) => {
    return monarchs.map(monarch => `${monarch.name} was ${monarch.title} from ${monarch.start} - ${monarch.start + monarch.reignLength}`).join('. ')
}

console.log(getMonarchs(monarchs))
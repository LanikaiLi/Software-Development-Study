// WARMUP PROBLEMS:
// 1
// You're creating an enrollment database for a school.
// Create an object called exampleStudent with the following properties: name is Anne Brown, age is 13 and grade is 6. She has not graduated (graduated = false).
// Write a function called updateStudentRecord. When run, it increases the student's grade and age by 1. If the grade is greater than 12, it records that the student has graduated.

const exampleStudent = {
    name: "Anne Brown",
    age: 13,
    grade: 6,
    graduated: false
}

const updateStudentRecord = (student) => {
    student.grade += 1
    student.age += 1
    if (student.grade > 12) {
        student.graduated = true
    }
}

updateStudentRecord(exampleStudent)

// 2
// Write a function called remindMe that takes in a string and a number of seconds. In that many seconds, console.log the string.
// For example, if I run remindMe("Preheat the oven.", 60), then it should remind me to do that in 60 seconds.

const remindMe = (message, seconds) => {
    setTimeout(() => {
        console.log(message)
    }, seconds * 1000)
}

remindMe("Do the dishes.", 6)
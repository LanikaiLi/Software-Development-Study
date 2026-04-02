// Warmup problem for April 2nd
// Write a function that takes in the following list of Grade 11 students:

let students = [
    { firstName: 'Sylvie', lastName: 'Thompson', class: {grade: 11, classroom: '?'},  DOB: '14/03/2008'},
    { firstName: 'John', lastName: 'Martinez', class: {grade: 11, classroom: '?'}, DOB: '02/11/2009'},
    { firstName: 'Mia', lastName: 'Boucher', class: {grade: 11, classroom: '?'}, DOB: '21/07/2008'},
    { firstName: 'Sam', lastName: 'Nguyen', class: {grade: 11, classroom: '?'} , DOB: '30/01/2008'},
    { firstName: 'Florence', lastName: 'Gagnon', class: {grade: 11, classroom: '?'}, DOB: '09/05/2009'},
]

// The function should assign a classroom to each student, dividing them evenly between classroom "A" and classroom "B". If there are an odd number of students, classroom A should get the extra student. It doesn't matter what order you assign the students in or how you choose which ones go to which classroom.

// my logic: i first calculate the number of students, if it is not odd, I divide evenly and I assign first half to classroom A and second half to classroom B. If it is odd, I first minus one then divide evenly, then I assign first half to classroom A and the rest to classroom B. 

const assignClassroom = (students) => {
    let numberOfStudents = students.length
    if (numberOfStudents % 2 === 0) {
        let half = numberOfStudents/2
        for (let i = 0; i< half; i++) {
            students[i].classroom = "A"
        }
        for (let i = half; i< numberOfStudents; i++) {
            students[i].classroom = "B"
        }
    }
    else {
        let half = (numberOfStudents-1)/2
        for (let i = 0; i< half; i++) {
            students[i].classroom = "B"
        }
        for (let i = half; i< numberOfStudents; i++) {
            students[i].classroom = "A"
        }
    }
    return students
}

// Extended problem (optional for if you finish early): Write a function called getOldestStudent which finds the oldest student on the list.
// my logic: initiate a dummy variable to store the oldest student, then loop through the array and compare the DOB of each student, if the DOB is older, update the dummy variable, finally return the dummy variable. i need to convert the DOB to a date object to compare the dates.

const getOldestStudent = (students) => {
    let oldestStudent = students[0]
    students.forEach(student => {
        if (new Date(student.DOB) < new Date(oldestStudent.DOB)) {
            oldestStudent = student
        }   
    })
    return oldestStudent
}
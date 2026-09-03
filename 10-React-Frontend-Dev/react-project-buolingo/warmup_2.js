// Given this array of courses:
// https://github.com/j-goodman/language-class-data/blob/main/data/class-list.json

// Filter them to include only ones which meet the following criteria:
// 1. The language being taught is Spanish or English.
// 2. The course begins no later than 18:00.
// 3. The course does not meet on Sundays.
// 4. The course is not beginner level.
// 5. The course has a capacity of at least 10.

let courses =[
    {
        "id": 11, "language": "Arabic", "teacher": "Aya", "level": "beginner",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 12, "language": "English", "teacher": "Brian", "level": "beginner",
        "days": ["Monday", "Wednesday", "Friday"], "time": ["18:30", "19:30"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 13, "language": "French", "teacher": "Florence", "level": "beginner",
        "days": ["Monday", "Wednesday", "Friday"], "time": ["18:30", "19:30"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 14, "language": "Hindi", "teacher": "Pari", "level": "beginner",
        "days": ["Wednesday", "Friday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 15, "language": "Mandarin", "teacher": "Yichen", "level": "beginner",
        "days": ["Monday", "Wednesday", "Friday"], "time": ["18:30", "19:30"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 16, "language": "Spanish", "teacher": "Camila", "level": "beginner",
        "days": ["Monday", "Wednesday", "Friday"], "time": ["18:30", "19:30"], "capacity": 10,
        "description": "An accessible introduction to the language for complete beginners, no prior experience needed."
    }, {
        "id": 17, "language": "English", "teacher": "Maria", "level": "intermediate",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "Builds on foundational skills to grow vocabulary and conversational confidence."
    }, {
        "id": 18, "language": "French", "teacher": "Florence", "level": "intermediate",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "Builds on foundational skills to grow vocabulary and conversational confidence."
    }, {
        "id": 19, "language": "Mandarin", "teacher": "Yichen", "level": "intermediate",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "Builds on foundational skills to grow vocabulary and conversational confidence."
    }, {
        "id": 20, "language": "Spanish", "teacher": "Valeria", "level": "intermediate",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 10,
        "description": "Builds on foundational skills to grow vocabulary and conversational confidence."
    }, {
        "id": 21, "language": "English", "teacher": "George", "level": "advanced",
        "days": ["Sunday"], "time": ["12:30", "16:30"], "capacity": 8,
        "description": "Focuses on fluency and real-world conversation for experienced students."
    }, {
        "id": 22, "language": "French", "teacher": "Guy", "level": "advanced",
        "days": ["Wednesday", "Friday"], "time": ["18:00", "20:00"], "capacity": 8,
        "description": "Focuses on fluency and real-world conversation for experienced students."
    }, {
        "id": 23, "language": "Spanish", "teacher": "Camila", "level": "advanced",
        "days": ["Tuesday", "Thursday"], "time": ["18:00", "20:00"], "capacity": 8,
        "description": "Focuses on fluency and real-world conversation for experienced students."
    }
]

const filteredCourses = courses.filter(
    course => 
        (course.language === "Spanish" || course.language === "English") 
         && course.time[0] <= "18:00"
         && !course.days.includes("Sunday")
         && course.level !== "beginner"
         && course.capacity >= 10
)

console.log(filteredCourses)
function CourseList({courses, languages}) {
    return (
        <ul>
            {courses.map(course => (
                <li>
                    <CourseDetail course={course} language={languages.find(lang => lang.language === course.language)}/>
                </li>
            ))}
        </ul>
    )
}

export default CourseList
function CourseList({courses, languages}) {
    return (
        <ul>
            {courses.map(course => (
                <li>
                    <h2>{course.name}</h2>
                    <p>{course.description}</p>
                </li>
            ))}
        </ul>
    )
}

export default CourseList
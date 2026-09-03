function CourseDetail({course, language}) {
    return (
        <div className="course-card">
          <h1>
            <img src={language?.['flag-icon']} alt={`${course.language} flag`} />
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)} {course.language} with {course.teacher}
          </h1>
          <ul>
            <li>Days: {course.days.join(", ")}</li>
            <li>Time: {course.time.join(" - ")}</li>
            <li>Capacity: {course.capacity}</li>
          </ul>
          <p>{course.description}</p>
        </div>
    )
}

export default CourseDetail
function TaskList({tasks, onDeleteTask}) {
    return (
        <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <Task task={task} onDeleteTask={onDeleteTask}/>
                    </li>
                )
            })}
        </ul>
    )
}

function Task({task, onDeleteTask}) {
    return (
        <>
           {task.text}
           <button onClick={() => onDeleteTask(task.id)}>🗑️</button>
        </>
    )

}

export default TaskList;
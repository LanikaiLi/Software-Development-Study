import {useReducer} from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

let nextId = 3
const initialTasks = [
  {id: 0, text: 'Buy milk'},
  {id: 1, text: 'Eat tacos'},
  {id: 2, text: 'Brew tea'},
]

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return tasks.concat({id: action.id, text: action.text})
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}


function App() {
  //const [tasks, setTasks] = useState(initialTasks)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  // function handleAddTask(text) {
  //   setTasks(
  //     tasks.concat([{id:nextId++, text:text}])
  //   )
  // }

  // function handleDeleteTask(id) {
  //   setTasks(tasks.filter(task => task.id != id))
  // }

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    })
  }

  function handleDeleteTask(id) {
    dispatch({type: 'deleted', id: id})
  }

  function handleDeleteTask(id) {
    dispatch({type: 'deleted', id: id})
  }

  return (
    <>
      <h2>Task List!</h2>
      <AddTask onAddTask={handleAddTask}></AddTask>
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask}></TaskList>
    </>
  )

}

export default App
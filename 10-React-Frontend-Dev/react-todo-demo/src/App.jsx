import {useState} from 'react';
//import AddTask from './AddTask';
//import TaskList from './TaskList';

let nextId = 3
const initialTasks = [
  {id: 0, text: 'Buy milk'},
  {id: 1, text: 'Eat tacos'},
  {id: 2, text: 'Brew tea'},
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)

  function handleAddTask(text) {
    setTasks(
      tasks.concat([{id:nextId++, text:text}])
    )
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id != id))
  }

  return (
    <>
      <h2>Task List!</h2>
      {
        tasks.map(task => {
          return (<p>{task.text}</p>)
        })
      }
    </>
  )

}

export default App
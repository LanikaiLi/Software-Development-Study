import {useState} from 'react';

function AddTask({onAddTask}) {
    const [text, setText] = useState('');

    return (
        <div>

            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button onClick={() => {
                onAddTask(text); // onAddTask is a function that we pass from App.jsx to AddTask
                setText('');
            }}>Add</button>
            
        </div>
    )
}

export default AddTask;
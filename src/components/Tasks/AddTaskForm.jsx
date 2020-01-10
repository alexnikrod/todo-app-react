import React, {useState} from 'react'; 
import axios from 'axios';

import addtSvg from '../../assets/img/add.svg';


const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');



    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({data}) => { 
                onAddTask(list.id, data)
                toggleFormVisible();
            })
            .catch(() => {
                alert('Error');
            })
            .finally(() => {
                setIsLoading(false);
            })

        
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addtSvg} alt="Add Icon"/>   
                <span>New Task</span> 
            </div>
            ) : (
                <div className="tasks__form-block">
                <input value={inputValue} className="field" type="text" placeholder="Tasks's text" 
                onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={isLoading} onClick={addTask} className="button">
                    {isLoading ? 'Adding' : 'Add Task'}
                </button>
                <button onClick={toggleFormVisible} className="button button--grey">Cancel</button>
            </div>
            )}
        </div>
    )
}

export default AddTaskForm;
import React, {useState} from 'react'; 
import axios from 'axios';
import {Link} from 'react-router-dom';

import editSvg from '../../assets/img/edit.svg';



const EditTitleList = ({list, onEditTitle}) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState(list.name);
    const [isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue(list.name);
    }

    const editTitle = () => {
        setIsLoading(true);
        
        if (inputValue) {
          onEditTitle(list.id, inputValue);
          axios.patch('http://localhost:3001/lists/' + list.id, {
              name: inputValue
          })
          .catch(() => {
              alert('Cant reload list');
          })
          .finally(() => {
            toggleFormVisible();
            setIsLoading(false);
        });
      }

        
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (
            <Link to={`/lists/${list.id}`}>
            <h2 style={{ color: list.color.hex }} className="tasks__title">
                {list.name}
                <img onClick={toggleFormVisible} src={editSvg} alt="Edit icon"/>  
            </h2>
          </Link>
            ) : (
                <div className="tasks__form-block">
                <input value={inputValue} className="field" type="text" 
                onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={isLoading} onClick={editTitle} className="button">
                    {isLoading ? 'Editing' : 'Save'}
                </button>
                <button onClick={toggleFormVisible} className="button button--grey">Cancel</button>
            </div>
            )}
        </div>
    )
}

export default EditTitleList;
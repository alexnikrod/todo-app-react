import React from "react";

const InputField = ({
  toggleFormVisible,
  inputValue,
  setInputValue,
  editItem,
  isLoading,
  placeholder,
  addTask,
  error,
  setError
}) => {
  const handleBlur = e => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        toggleFormVisible();
      }
    }, 0);
  };

  const onChange = (e) => {
    setInputValue(e.target.value)
    setError(false);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      // editItem();
      console.log("was")
    }
  }

  return (
    <div className="tasks__form-block" tabIndex="1" onBlur={e => handleBlur(e)}>
      {error && <span className="field__error">Please fill this field</span>}

      <input
        value={inputValue}
        className="field"
        type="text"
        autoFocus
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
      />
      {placeholder ? (
        <button disabled={isLoading} onClick={addTask} className="button">
          {isLoading ? "Adding" : "Add Task"}
        </button>
      ) : (
        <button disabled={isLoading} onClick={editItem} className="button">
          {isLoading ? "Editing" : "Save"}
        </button>
      )}
      <button onClick={toggleFormVisible} className="button button--grey">
        Cancel
      </button>
    </div>
  );
};

export default InputField;

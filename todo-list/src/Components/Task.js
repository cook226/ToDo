import React, { useState } from 'react';

function Task({ id, description, isCompleted, onToggleCompleted, onDelete, onUpdate }) {
  // State to manage whether the task is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to manage the input value while editing
  const [editInput, setEditInput] = useState(description);

  // Function to handle switching to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle canceling the edit
  const handleCancel = () => {
    setIsEditing(false);
    setEditInput(description); // Reset the edit input if the user cancels
  };

  // Function to handle saving the updated task description
  const handleSave = () => {
    onUpdate(id, editInput); // Invoke the onUpdate function passed from the parent component
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      <input type="checkbox" checked={isCompleted} onChange={onToggleCompleted} />
      {isEditing ? (
        // If in edit mode, show an input field and Save/Cancel buttons
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        // If not in edit mode, show the task description and Edit/Delete buttons
        <>
          <span>{description}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Task;

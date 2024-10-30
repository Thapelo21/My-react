// src/components/UserManagementList.js
import React, { useState, useEffect } from 'react';

function UserManagementList({ users, onDeleteUser, onEditUser, onUpdateUser, editingUserIndex, setEditingUserIndex }) {
  // State variables to hold username and password values for the form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Effect hook to populate form fields when editing a user
  useEffect(() => {
    if (editingUserIndex !== null) {
      const user = users[editingUserIndex]; 
      setUsername(user.username); 
      setPassword(user.password); 
    } else {
      // Clear the form fields when not editing
      setUsername('');
      setPassword('');
    }
  }, [editingUserIndex, users]); 
  // Handle the submission of the update form
  const handleUpdateUser = (e) => {
    e.preventDefault(); 
    onUpdateUser(editingUserIndex, { username, password }); 
  };

  return (
    <div>
      <h2>User Management</h2>

      {/* Display the list of users with edit and delete options */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} {/* Display username */}
            <button onClick={() => onEditUser(index)}>Edit</button> {/* Edit button */}
            <button onClick={() => onDeleteUser(index)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>

      {/* Show the update form if a user is being edited */}
      {editingUserIndex !== null && (
        <form onSubmit={handleUpdateUser}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Update User</button> {/* Submit button for updating user */}
        </form>
      )}
    </div>
  );
}

export default UserManagementList;

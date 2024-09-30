import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./UserContext";
import "./styles/Fetch.scss";

const Fetch = () => {
  // handling state by Context API ( in UserContext.js )
  const { users, deleteUser } = useUsers(); 
  const navigate = useNavigate();

  // will navigate to user-form and send selected user for editing
  const handleEdit = (user) => {
    navigate("/user-form", { state: { user } }); 
  };

  return (
    <div className="home">
      <table border="1px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit Info</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr id={user.id} key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button type="button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </td>
              <td>
                <button type="button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fetch;
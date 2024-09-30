import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    //fetching data
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
        };
        fetchUsers();
    }, []);


    //creating a user, adding the response with previously fetched user
    const createUser = async (userDetails) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', userDetails);
            setUsers(prevUsers => [...prevUsers, response.data]);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    //editing user, changing that user with provided id to the user sent by UserForm.js
    const updateUser = async (updatedUser) => {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    //deleting the user from user state with the same id as provided id
    const deleteUser = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        //custom hook
        <UserContext.Provider value={{ users,createUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

//custom hook
export const useUsers = () => useContext(UserContext);
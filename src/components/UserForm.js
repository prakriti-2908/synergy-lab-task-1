import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "./UserContext";
import "./styles/UserForm.scss";

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, updateUser } = useUsers();

  //checking if creation is required or editting is required
  const isCreating = location.state?.isCreating;

  //setting up initial form data for state if creation is required

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
  };

  //creating state -> if creation is required then state will have empty initial form data, else it will be having user data that has been sent by Fetch component
  const [formData, setFormData] = useState(
    isCreating ? initialFormData : location.state.user
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handling the submit by executing required task,
  //the functions createUser and updateUser are defined in userContext.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreating) {
      await createUser(formData);
    } else {
      await updateUser({ ...formData, id: location.state.user.id });
    }
    navigate("/");
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">
          {isCreating ? "Create User" : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/Header.scss";

const Header = () => {
  const navigate = useNavigate();

  //will navigate to user-form
  const handleCreateUser = () => {
    navigate("/user-form", { state: { isCreating: true } }); 
  };

  return (
    <div className="navbar">
      <div className="left">
        <div className="logo">
          <h2>SynergyLabs</h2>
        </div>
      </div>
      <div className="right">
        {/* button for creating a new user */}
        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default Header;
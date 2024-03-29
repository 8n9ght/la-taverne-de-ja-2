import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminMenu = () => {

    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/admin')
    };

    return (
        <div className="container">
            <header>
                <h1>Welcome to the Lab</h1>
                <p onClick={logout} className="logout">Logout</p>
            </header>

            <h3 className="adminMenuText">What do you want to do ?</h3>

            <div className="menuLinks">
                <Link to="/drinkmanagement">Manage Drinks <span role="img" aria-label="drinks emoji">🍸</span></Link>
                <Link to="/adddrink">Add drinks <span role="img" aria-label="magic emoji">🪄</span></Link>
            </div>
        </div>
    )
}

export default AdminMenu;
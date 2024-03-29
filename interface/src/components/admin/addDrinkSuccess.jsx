import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const addDrinkSuccess = () => {
    const navigate = useNavigate;

    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/admin')
    };

  return (
    <div className="container">
        <h2>Boisson ajoutée avec succès</h2>
        <div>
            <Link to="/adddrink">En importer une autre</Link>
            <p onClick={logout}>Me déconnecter</p>
        </div>
    </div>
  )
}

export default addDrinkSuccess;
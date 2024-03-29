import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Admin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    let apiUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/admin/login';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/admin/login';
    }

    const handleConnect = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setMessage('Veuillez entrer un nom d\'utilisateur et un mot de passe');
            return;
        }
        try {
            const response = await axios.post(apiUrl, { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/adminmenu');
        } catch (err) {
            console.error(err);
            setMessage('Les informations entrées sont incorrectes');
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Bacchus Hideout</h1>
            </header>

            <div className="adminForm">
                <input type="text" max={10} value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="password" max={10} value={password} onChange={e => setPassword(e.target.value)}></input>
                <button onClick={handleConnect} className="loginBtn">Get to Magic</button>
                {message && <p className="logMessage">{message}</p>}
            </div>

            <Link to="/addadmin">New Drink Master</Link>
            <Link to="/">I'm just a human</Link>
        </div>
    )
}

export default Admin;

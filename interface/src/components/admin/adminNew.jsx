import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddAdmin = () => {
    axios.defaults.withCredentials = true;
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (username.length < 3 || username.length > 10) {
            setMessage('Le nom d\'utilisateur doit comporter entre 3 et 10 caractères');
            return;
        }
        if (password.length < 8 || password.length > 20) {
            setMessage('Le mot de passe doit comporter entre 8 et 20 caractères');
            return;
        }
        if (secretCode !== 'VotreCodeSecret') {
            setMessage('Le code secret est incorrect');
            return;
        }
        try {
            const res = await axios.post('https://ineedadrink.onrender.com/admin/login', { username, password });
            const token = res.data.token;
            console.log(token);
            navigate('/adminmenu')
        } catch (err) {
            console.error(err);
            setMessage('Les informations entrées sont incorrectes');
        }
    };

    return (
        <div className="container">
            <header>
                <Link to="/admin" className="back">Back</Link>
                <h1>Become Bacchus</h1>
            </header>

            <div className="adminForm">
                <input type="text" maxLength={10} onChange={e => setUsername(e.target.value)}></input>
                <input type="password" maxLength={20} onChange={e => setPassword(e.target.value)}></input>
                <input type="password" placeholder="Code Secret" onChange={e => setSecretCode(e.target.value)}></input>
                <button onClick={handleSignup}>Become Drink Master</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default AddAdmin;

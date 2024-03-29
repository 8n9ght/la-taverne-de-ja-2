/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DrinkManagement = () => {

    const navigate = useNavigate();
    const [deleteDrinkId, setDeleteDrinkId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    let apiUrl;
    let deleteUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/admin/getall';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/admin/getall';
    }

    const [beverages, setBeverages] = useState([])
    axios.defaults.withCredentials = true;

    const handlePopup = (id) => {
        setDeleteDrinkId(id);
        document.getElementById('confirmDelete').classList.remove('hidden')
    }
    
    const handleClosePopup = () => {
        document.getElementById('confirmDelete').classList.add('hidden')
    }

    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/admin')
    };

    const handleDelete = () => {
        const id = deleteDrinkId;
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }
        
        if (process.env.NODE_ENV === "development") {
            deleteUrl = `http://localhost:5000/admin/delete/${id}`;
        } else {
            deleteUrl = `https://ineedadrink.onrender.com/admin/delete/${id}`;
        }
    
        axios.delete(deleteUrl, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log('Drink deleted successfully');
            handleClosePopup();
            setRefresh(true);
          })
          .catch((error) => {
            console.error("There was an error!", error);
            
          });
      };

      /* const handleUpdate = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }
        
        const updateUrl = `your-api-url/${id}/update`;
    
        axios.put(updateUrl, {  }, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log('Drink updated successfully');
            
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }; */

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found!");
            return;
        }
        
        axios.get(apiUrl, {headers: {
            Authorization: `Bearer ${token}`
        }})
            .then((res) => {
                setBeverages(res.data);
                setRefresh(false);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [refresh]);
    

    return (
        <div className="container">
            <div id="confirmDelete" className="hidden">
                <h3 className="popupTitle">Confirm deletion</h3>
                <div className="popupBtn">
                    <button onClick={handleDelete}>Yes <span role="img" aria-label="yes emoji">🥲</span></button>
                    <button onClick={handleClosePopup}>No <span role="img" aria-label="no emoji">😲</span></button>
                    
                </div>
            </div>

            <header>
                <Link to="/adminmenu" className="back">Back</Link>
                <h1>Drinks Management</h1>
                <p onClick={logout} className="logout">Logout</p>
            </header>

            <div className="beverages">
                {beverages.map((el) => {
                    return(
                        <div className="beverageItem" key={el.name} >
                            <div className="beverageContent" key={el.id}>
                                <h2>{el.name}</h2>
                                <article className="beverageIngredients">
                                    {el.ingredients.map((item) => {
                                        return(
                                            <p key={item}>{item}</p>
                                        )
                                    })}
                                </article>
                            </div>
                            <article className="btnManagement">
                                <button><span role="img" aria-label="edit emoji">✏️</span></button>
                                <button onClick={() => handlePopup(el._id)}><span role="img" aria-label="edit emoji">❌</span></button>
                            </article>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DrinkManagement;
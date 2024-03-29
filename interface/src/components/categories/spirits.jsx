/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Spirits() {
    const [drinks, setDrinks] = useState([])

    let apiUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/spirits/';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/spirits/';
    }

    useEffect(() => {
        axios.get(apiUrl, { withCredentials: true })
        .then((res) => {
            setDrinks(res.data)
        })
    }, [])

  return (
    <div className="container">
      <header>
        <Link to="/categories" className="back">Back</Link>
        <h1>Spirits</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem" key={drink.name}>
              <p className="drinkName">{drink.name}</p>
              {drink.available === true ? <p className="drinkDatas">Disponible</p> : <p className="drinkDatas">En rupture</p>}
            </div>
          )
        })}
      </div>
</div>
  )
}

export default Spirits;

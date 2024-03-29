/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import OneSignal from 'react-onesignal';

const Home = () => {

  let appID;

  if (process.env.NODE_ENV === "development") {
    appID = "acfc5a8a-d9f7-4875-b46d-ba990edf49bd";
    /* OneSignal.init({ appId: appID, allowLocalhostAsSecureOrigin: true});
    OneSignal.showSlidedownPrompt(); */
  } else {
    appID = "254a216f-d856-4dd6-ab53-f03dd8654ea1";
    /* OneSignal.init({ appId: appID }).then(() => {
    OneSignal.showSlidedownPrompt().then(() => {
    });
  }) */
  }
  
  let apiUrl;
  const [notificationPermission, setNotificationPermission] = useState("default");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const name = useRef();

  if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:5000/users/create";
  } else {
    apiUrl = "https://ineedadrink.onrender.com/users/create";
  }

  const disableNotifications = () => {
    setNotificationPermission("denied");
    navigate("/menu");
  };
  
  const enableNotifications = () => {
    setNotificationPermission("granted");
  }

  const [identifier, setIdentifier] = useState(localStorage.getItem("identifier") || "");
  
  const handleChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handleSubscribe = () => {
    if (identifier === "") {
      alert("Veuillez renseigner le champ");
    } else {
      setLoading(true);
      localStorage.setItem("identifier", name.current.value);
      axios
        .post(apiUrl, { name: identifier })
        .then((response) => {
          setLoading(false);
          alert("Ton inscription a bien été validée !");
          navigate("/menu");
        })
        .catch((error) => {
          alert("Erreur lors de l'enregistrement de l'utilisateur temporaire");
          console.error("L'erreur suivante empêche la création de l'utilisateur : ", error)
        });
    }
  };

  return (
    <div className="container">
      <header className="homeHeader">
        <p>Bienvenue à</p>
        <h1>La Taverne de J-A</h1>
      </header>

      <div className="content">
        {notificationPermission !== "granted" && (
          <div className="notifsPerm">
            <p>
              Pour profiter d'une expérience complète active les notifications
            </p>
            <button onClick={enableNotifications}>
              Oui, je veux commander
            </button>
            <button onClick={disableNotifications}>
              Je regarde juste la carte !
            </button>
          </div>
        )}

        {notificationPermission === "granted" && (
          <div className="homeForm">
            <input
              type="text"
              value={identifier}
              onChange={handleChange}
              placeholder="Entre un pseudo, nom ou prénom"
              ref={name}
            />
            <button onClick={handleSubscribe}>
              {loading ? (<div className="loader"></div>) : ("Découvrir la carte")}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
    
    
    return (
        <div className="menuLinks">
            <Link to="/cocktails">Cocktails</Link>
            <Link to="/mocktails">Mocktails</Link>
            <Link to="/spirits">Spiritueux</Link>
            <Link to="/shots">Shots</Link>
        </div> 
    )
}

export default Categories;
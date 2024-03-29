import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddDrink = () => {
  const navigate = useNavigate();

  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = `http://localhost:5000/admin/new`;
  } else {
    apiUrl = `https://ineedadrink.onrender.com/admin/new`;
  }

  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    category: "",
    availability: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const formDataWithImage = new FormData();
  formDataWithImage.append("name", formData.name);
  formDataWithImage.append("ingredients", JSON.stringify(formData.ingredients));
  formDataWithImage.append("category", formData.category);
  formDataWithImage.append("availability", formData.availability);
  formDataWithImage.append("image", imageFile);

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = e.target.value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found!");
      return;
    }

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFormData({
          name: "",
          ingredients: [],
          category: "",
          availability: true,
        });
        setImageFile(null);
        navigate("/addsuccess");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <header>
        <Link to="/adminmenu" className="back">
          Back
        </Link>
        <h1>Add a new drink</h1>
        <p onClick={logout} className="logout">
          Logout
        </p>
      </header>

      <div className="addForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="ingredients">Ingrédients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name={`ingredient-${index}`}
                id={`ingredient-${index}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Ajouter un ingrédient
          </button>

          <label htmlFor="category">Catégorie</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="cocktails">Cocktails</option>
            <option value="mocktails">Mocktails</option>
            <option value="shots">Shots</option>
            <option value="spirits">Spirits</option>
          </select>

          <label htmlFor="image">Photo</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
          />

          <div className="available">
            <label>Disponibilité</label>
            <label htmlFor="availability">En stock</label>
            <input
              type="checkbox"
              name="availability"
              id="availability"
              checked={formData.availability}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Ajouter à la liste</button>
        </form>
      </div>
    </div>
  );
};

export default AddDrink;

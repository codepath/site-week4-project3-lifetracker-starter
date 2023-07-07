import { useState } from "react";
import "./NutritionForm.css";
import apiClient from "../../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function NutritionForm({ setAppState, appState }) {
  const [nutritionForm, setNutritionForm] = useState({
    name: "",
    quantity: 1,
    calories: 0,
    category: "default",
    imageUrl: "",
  });
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setNutritionForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  async function saveRecord(c) {
    c.preventDefault();
    setErrors((e) => ({ ...e, regForm: null }));
    setIsLoading(true);
    const { data, error } = await apiClient.recordNutrition({
      name: nutritionForm.name,
      category: nutritionForm.category,
      quantity: nutritionForm.quantity,
      calories: nutritionForm.calories,
    });

    if (error) setErrors((e) => ({ ...e, regForm: error }));
    if (data?.newNutrition) {
      setAppState({ ...appState, nutritions: [...appState.nutritions, data.newNutrition] });
      navigate("/nutrition");
    }

    setIsLoading(false);

    setNutritionForm({
      name: "",
      quantity: 1,
      calories: 0,
      category: "default",
      imageUrl: "",
    });
  }

  return (
    <div className="nutrition-form">
      <h1>Record Nutrition</h1>
      <div className="nutrition-form">
        <form className="card">
          <input
            className="form-input"
            type="text"
            name="name"
            value={nutritionForm.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <div className="category-box">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-input"
              name="category"
              value={nutritionForm.category}
              onChange={handleChange}
              required
            >
              <option defaultValue="default">Select a Category</option>
              <option value="SNACK">Snack</option>
              <option value="BEVERAGE">Beverage</option>
              <option value="FOOD">Food</option>
            </select>
          </div>
          <div className="box">
            <div className="sub-box">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                className="form-input"
                type="number"
                min={1}
                max={100}
                name="quantity"
                value={nutritionForm.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sub-box">
              <label htmlFor="calories">Calories</label>
              <input
                id="calories"
                className="form-input"
                type="number"
                min={0}
                max={100000}
                step={10}
                name="calories"
                value={nutritionForm.calories}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <input
            className="form-input"
            type="text"
            name="imageUrl"
            value={nutritionForm.imageUrl}
            placeholder="Image Url"
            onChange={handleChange}
          />
          <button
            className="submit-registration"
            disabled={isLoading}
            onClick={saveRecord}
          >
            {isLoading ? "Loading... " : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

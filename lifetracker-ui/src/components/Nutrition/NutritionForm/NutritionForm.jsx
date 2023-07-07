import { useState } from "react";
import "./NutritionForm.css";
import apiClient from "../../../../services/apiClient";

export default function NutritionForm({ setAppState, appState }) {
  const [nutritionForm, setNutritionForm] = useState({
    name: "",
    quantity: 1,
    calories: 0,
    category: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setNutritionForm({ ...e, [e.target.name]: e.target.value });
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
    if (data?.nutrition) {
      setAppState(...appState, { nutrition: data.nutrition });
    }
    setIsLoading(false);
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
          <select className="form-input" required>
            <option defaultValue="selected">Select a category</option>
            <option value="snack">Snack</option>
            <option value="beverage">Beverage</option>
            <option value="food">Food</option>
          </select>
          <div className="box">
            <div className="sub-box">
              <label htmlFor="quantity">Quantity</label>
              <input
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

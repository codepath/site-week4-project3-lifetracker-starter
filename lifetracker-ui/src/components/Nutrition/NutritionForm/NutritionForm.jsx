import { useState } from "react";
import "./NutritionForm.css";

export default function NutritionForm() {
  const [nutritionForm, setNutritionForm] = useState({
    name: "",
    quantity: 1,
    calories: 0,
    category: "",
  });

  const handleChange = (e) => {
    setNutritionForm({ ...e, [e.target.name]: e.target.value });
  };
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
                name="calories"
                value={nutritionForm.calories}
                onChange={handleChange}
                required
              />
            </div>

          </div>
            <button>Save</button>
        </form>
      </div>
    </div>
  );
}

import "./NutritionForm.css";
import { useNewNutritionForm } from "../../hooks/useNewNutritionForm";

export default function NutritionForm() {
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useNewNutritionForm();
  return (
    <div className="nutrition-form">
      <h2>Record Nutrition</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Nutrition name"
            value={form.name}
            onChange={handleOnInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <div className="input-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Nutrition category"
              value={form.category}
              onChange={handleOnInputChange}
            />
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="1"
                value={form.quantity}
                onChange={handleOnInputChange}
              />
              {errors.quantity && (
                <span className="error">{errors.quantity}</span>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                name="calories"
                placeholder="1"
                value={form.calories}
                onChange={handleOnInputChange}
              />
              {errors.calories && (
                <span className="error">{errors.calories}</span>
              )}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="http://www.food-image.com/1"
              value={form.imageUrl}
              onChange={handleOnInputChange}
            />
            {errors.imageUrl && (
              <span className="error">{errors.imageUrl}</span>
            )}
          </div>

          <button
            className="submit-nutrition"
            disabled={isLoading}
            onClick={handleOnSubmit}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

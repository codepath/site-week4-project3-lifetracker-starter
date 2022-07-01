import { useNavigate, Link } from "react-router-dom";
import "./ActivityNew.css";
import { useState } from "react";
import axios from "axios";

export default function ActivityNew() {
  return (
    <div className="activity-new">
      <ActivityForm />
    </div>
  );
}

export function ActivityForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    calories: 0,
    quantity: 0,
    imageUrl: "",
    category: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/nutrition", {
        name: form.name,
        calories: form.calories,
        imageUrl: form.imageUrl,
        category: form.category,
      });

      if (res?.data?.user) {
        //setAppState(res.data);
        setIsLoading(false);
        navigate("/activity");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="activity-form">
      <h2>Record Activity</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Activity name"
            value={form.name}
            onChange={handleOnInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <div className="input-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Activity category"
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
            className="submit-activity"
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

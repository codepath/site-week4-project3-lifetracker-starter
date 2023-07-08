import * as React from "react";
import "./NutritionForm.css";
import { useState } from "react";
import axios from "axios";

export default function NutritionForm({ appState, setNutritionArray }) {
  const [nutrition, setNutrition] = useState({
    name: "",
    category: "",
    quantity: "",
    calories: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "category") {
      setNutrition((prevState) => ({
        ...prevState,
        [event.target.name]:
          event.target.options[event.target.selectedIndex].value,
      }));
    } else {
      setNutrition((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      "https://lifetracker-api-tifu.onrender.com/auth/nutrition/create",
      {
        name: nutrition.name,
        category: nutrition.category,
        quantity: nutrition.quantity,
        calories: nutrition.calories,
        user_id: appState.user_id,
      }
    );
    // CLEARING INPUTS
    setNutrition({
      name: "",
      category: "",
      quantity: "",
      calories: "",
    });

    axios
      .get("https://lifetracker-api-tifu.onrender.com/auth/nutrition", {
        params: {
          user_id: appState.user_id,
        },
      })
      .then((response) => {
        const nutritions = response.data.nutritions;
        setNutritionArray(nutritions);
      })
      .catch((error) => {
        console.log("Error with axios:", error);
      });
  };

  return (
    <div className="ExercisePage css-1bpnzr3">
      <div className="banner-nutrition">
        <div className="chakra-stack css-1cgbrw5">
          <h2 className="chakra-heading css-b5coes">Nutrition</h2>
        </div>
      </div>
      <div class="css-vpbd2d">
        <div class="css-0">
          <div class="css-pwgvc2">
            <div class="chakra-stack css-1jtnem3">
              <div class="css-1hv8zgx">
                <div></div>
                <div class="css-mlsaez">
                  <div class="chakra-stack css-13ra036">
                    <h2 class="chakra-heading nutrition-heading">
                      Record Nutrition
                    </h2>
                    <div class="information-structure">
                      <form>
                        <div class="chakra-stack css-1db3zf7">
                          <div
                            role="group"
                            class="chakra-form-control css-1kxonj9"
                          >
                            <div
                              class="chakra-input__group css-bx0blc"
                              data-group="true"
                            >
                              <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                id="field-:rk:"
                                required=""
                                aria-required="true"
                                class="chakra-input css-p20xy6"
                                value={nutrition.name}
                                onChange={handleOnInputChange}
                              />
                            </div>
                          </div>
                          <div
                            role="group"
                            class="chakra-form-control css-1kxonj9"
                          >
                            <label
                              id="field-:rl:-label"
                              for="field-:rl:"
                              class="chakra-form__label css-g6pte"
                            >
                              Category
                              <span
                                role="presentation"
                                aria-hidden="true"
                                class="chakra-form__required-indicator css-1tfjd1n"
                              >
                                *
                              </span>
                            </label>
                            <div class="chakra-select__wrapper css-42b2qy">
                              <select
                                name="category"
                                class="chakra-select css-1gpsbw3"
                                value={nutrition.category}
                                onChange={handleOnInputChange}
                              >
                                <option value="">Select a category</option>
                                <option value="Snack">Snack</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Food">Food</option>
                              </select>
                              <div class="chakra-select__icon-wrapper css-iohxn1">
                                <svg
                                  viewBox="0 0 24 24"
                                  role="presentation"
                                  class="chakra-select__icon"
                                  focusable="false"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div class="css-9jay18">
                            <div
                              role="group"
                              class="chakra-form-control css-1kxonj9"
                            >
                              <label
                                id="field-:rm:-label"
                                for="field-:rm:"
                                class="chakra-form__label css-g6pte"
                              >
                                Quantity
                                <span
                                  role="presentation"
                                  aria-hidden="true"
                                  class="chakra-form__required-indicator css-1tfjd1n"
                                >
                                  *
                                </span>
                              </label>
                              <div
                                value=""
                                class="chakra-numberinput css-3e5t3k"
                              >
                                <input
                                  name="quantity"
                                  type="text"
                                  class="chakra-numberinput__field css-1551roq"
                                  value={nutrition.quantity}
                                  onChange={handleOnInputChange}
                                />
                              </div>
                            </div>
                            &nbsp;
                            <div
                              role="group"
                              class="chakra-form-control css-1kxonj9"
                            >
                              <label
                                id="field-:rn:-label"
                                for="field-:rn:"
                                class="chakra-form__label css-g6pte"
                              >
                                Calories
                                <span
                                  role="presentation"
                                  aria-hidden="true"
                                  class="chakra-form__required-indicator css-1tfjd1n"
                                >
                                  *
                                </span>
                              </label>
                              <div
                                value=""
                                class="chakra-numberinput css-3e5t3k"
                              >
                                <input
                                  name="calories"
                                  type="text"
                                  class="chakra-numberinput__field css-1551roq"
                                  value={nutrition.calories}
                                  onChange={handleOnInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            id="button-nutrition"
                            class="chakra-button css-4lvvxn"
                            onClick={handleOnSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
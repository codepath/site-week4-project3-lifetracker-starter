import * as React from "react"
import "./ExerciseForm.css"
import { useState } from "react"
import axios from "axios";

export default function ExerciseForm({isLoggedIn, appState}) {

    const [exercise, setExercise] = useState({
        name: "",
        category: "",
        time: "",
        intensity: "",
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "category") {
          setExercise((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.options[event.target.selectedIndex].value,
          }));
        } else {
            console.log(appState.user_id)
          setExercise((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
          }));
        }
      };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
    
        const res = await axios.post("http://localhost:3001/auth/exercise/create", {
            name: exercise.name,
            category: exercise.category,
            time: exercise.time,
            intensity: exercise.intensity,
            user_id: appState.user_id,
          })
          // CLEARING INPUTS
          setExercise({
            name: "",
            category: "",
            time: "",
            intensity: "",
          });
    
    }

  
    return (
    <div className="ExercisePage css-1bpnzr3">
    <div className="css-19cns6y">
        <div className="chakra-stack css-1cgbrw5"><h2 className="chakra-heading css-b5coes">Exercise</h2></div>
    </div>
    <div class="css-vpbd2d">
    <div class="css-0">
        <div class="css-pwgvc2">
            <div class="chakra-stack css-1jtnem3">
                <div class="css-1hv8zgx">
                    <div></div>
                    <div class="css-mlsaez">
                        <div class="chakra-stack css-13ra036">
                            <h2 class="chakra-heading css-g56s2a">Record Exercise</h2>
                            <div class="information-structure">
                                <form>
                                    <div class="chakra-stack css-1db3zf7">
                                        <div role="group" class="chakra-form-control css-1kxonj9">
                                            <div class="chakra-input__group css-bx0blc" data-group="true">
                                                <input
                                                    name="name"
                                                    type="text"
                                                    placeholder="Name"
                                                    id="field-:rk:"
                                                    required=""
                                                    aria-required="true"
                                                    class="chakra-input css-p20xy6"
                                                    value={exercise.name}
                                                    onChange={handleOnInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div role="group" class="chakra-form-control css-1kxonj9">
                                            <label id="field-:rl:-label" for="field-:rl:" class="chakra-form__label css-g6pte">
                                                Category<span role="presentation" aria-hidden="true" class="chakra-form__required-indicator css-1tfjd1n">*</span>
                                            </label>
                                            <div class="chakra-select__wrapper css-42b2qy">
                                                <select name="category" class="chakra-select css-1gpsbw3" value={exercise.category} onChange={handleOnInputChange}>
                                                    <option value="">Select a category</option>
                                                    <option value="Run">Run</option>
                                                    <option value="Bike">Bike</option>
                                                    <option value="Lift">Lift</option>
                                                    <option value="Swim">Swim</option>
                                                    <option value="Sports">Sports</option>
                                                </select>
                                                <div class="chakra-select__icon-wrapper css-iohxn1">
                                                    <svg viewBox="0 0 24 24" role="presentation" class="chakra-select__icon" focusable="false" aria-hidden="true">
                                                        <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="css-9jay18">
                                            <div role="group" class="chakra-form-control css-1kxonj9">
                                                <label id="field-:rm:-label" for="field-:rm:" class="chakra-form__label css-g6pte">
                                                    Duration (min)<span role="presentation" aria-hidden="true" class="chakra-form__required-indicator css-1tfjd1n">*</span>
                                                </label>
                                                <div value="" class="chakra-numberinput css-3e5t3k">
                                                    <input
                                                        name="time"
                                                        type="text"
                                                        class="chakra-numberinput__field css-1551roq"
                                                        value={exercise.time}
                                                        onChange={handleOnInputChange}
                                                    />
                                                </div>
                                            </div>
                                            &nbsp;
                                            <div role="group" class="chakra-form-control css-1kxonj9">
                                                <label id="field-:rn:-label" for="field-:rn:" class="chakra-form__label css-g6pte">
                                                    Intensity<span role="presentation" aria-hidden="true" class="chakra-form__required-indicator css-1tfjd1n">*</span>
                                                </label>
                                                <div value="" class="chakra-numberinput css-3e5t3k">
                                                    <input
                                                        name="intensity"
                                                        type="text"
                                                        class="chakra-numberinput__field css-1551roq"
                                                        value={exercise.intensity}
                                                        onChange={handleOnInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button class="chakra-button css-4lvvxn" onClick={handleOnSubmit}>Save</button>
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
  )
}
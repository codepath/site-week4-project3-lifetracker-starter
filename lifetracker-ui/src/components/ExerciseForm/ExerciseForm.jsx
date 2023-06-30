import * as React from "react"
import "./ExerciseForm.css"

export default function ExerciseForm() {
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
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div role="group" class="chakra-form-control css-1kxonj9">
                                            <label id="field-:rl:-label" for="field-:rl:" class="chakra-form__label css-g6pte">
                                                Category<span role="presentation" aria-hidden="true" class="chakra-form__required-indicator css-1tfjd1n">*</span>
                                            </label>
                                            <div class="chakra-select__wrapper css-42b2qy">
                                                <select name="category" id="field-:rl:" required="" aria-required="true" class="chakra-select css-1gpsbw3">
                                                    <option value="">Select a category</option>
                                                    <option value="run">Run</option>
                                                    <option value="bike">Bike</option>
                                                    <option value="lift">Lift</option>
                                                    <option value="swim">Swim</option>
                                                    <option value="sports">Sports</option>
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
                                                        name="duration"
                                                        inputmode="decimal"
                                                        type="text"
                                                        pattern="[0-9]*(.[0-9]+)?"
                                                        id="field-:rm:"
                                                        aria-readonly="false"
                                                        aria-required="true"
                                                        required=""
                                                        role="spinbutton"
                                                        aria-valuemin="1"
                                                        aria-valuemax="100"
                                                        autocomplete="off"
                                                        autocorrect="off"
                                                        class="chakra-numberinput__field css-1551roq"
                                                        value=""
                                                    />
                                                    {/* <div aria-hidden="true" class="css-1jj9yua">
                                                        <div role="button" tabindex="-1" class="css-1m5jnul">
                                                            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                        <div role="button" tabindex="-1" class="css-1m5jnul">
                                                            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div> */}
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
                                                        inputmode="decimal"
                                                        type="text"
                                                        pattern="[0-9]*(.[0-9]+)?"
                                                        id="field-:rn:"
                                                        aria-readonly="false"
                                                        aria-required="true"
                                                        required=""
                                                        role="spinbutton"
                                                        aria-valuemin="1"
                                                        aria-valuemax="10"
                                                        aria-valuenow="1"
                                                        aria-valuetext="1"
                                                        autocomplete="off"
                                                        autocorrect="off"
                                                        class="chakra-numberinput__field css-1551roq"
                                                        value=""
                                                    />
                                                    {/* <div aria-hidden="true" class="css-1jj9yua">
                                                        <div role="button" tabindex="-1" class="css-1m5jnul">
                                                            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                        <div role="button" tabindex="-1" disabled="" aria-disabled="true" class="css-1m5jnul">
                                                            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" class="chakra-button css-4lvvxn">Save</button>
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
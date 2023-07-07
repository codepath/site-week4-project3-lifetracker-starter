import React, { useState } from "react"
import "./NutritionPage.css"
import axios from "axios"

export default function NutritionPage({ appState, setAppState }) {
    const [nutritionform, setNutritionForm] = useState({
        name: '', categories: '', quantity: '', url: '', calories: ''

    })
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/auth/nutrition", formInput)
        console.log(res)
        setAppState((prev) => ({
            ...prev,
            nutrition: [[res.data.nutrition, ...prev.nutrition]],
        }));
    }

    return (
        <div className="nutrition-forms">
            <h8> Nutrition </h8>
            {appState.isAuthenticated ? (
                <><form className="ncontainer">
                    <label> Name </label>
                    <input value={nutritionform.name} onChange={(e) =>
                        setNutritionForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))}
                        name="username" placeholder="Input Username" />
                    <label> Categories </label>
                    <select>
                        <option> select categories </option>
                        <option> Snack </option>
                        <option> Beverage </option>
                        <option> Food </option>

                    </select>
                    <label> Quantity </label>
                    <input type="number" name="quantity" placeholder="" />

                    <input type='text' name="url" placeholder="url for image" />

                    <label> Calories </label>
                    <input type="number" name="calories" placeholder="" />
                </form>
                    <button className="buttonsave" onClick={handleSubmit}> Save </button>
                </>
            ) : (<p className='logter'>login to view</p>)}

        </div>
    )
}
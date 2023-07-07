import React, { useState } from "react"
import "./ExercisePage.css"
import { Link } from 'react-router-dom'
import axios from "axios"

export default function ExercisePage({appState, setAppState}) {
    const [exerciseform, setExceriseForm] = useState({
        name: '', categories: '', duration: '', intensity: ''

    })
    console.log(exerciseform)
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/auth/exercise", formInput)
        console.log(res)
        setAppState((prev)=> ({
            ...prev,
            user: res.data.firstname,
            isAuthenticated: true,
            exercise: [],
            nutrition: [],
            sleep: []
        }));
    }
    return (
        <div className="exercise-forms">
            <h8> Exercise </h8>
            {appState.isAuthenticated ? (
                <> <form className="containerexer">
                <label> Name </label>
                <input value={exerciseform.name} onChange={(e) =>
                    setExerciseform((prev) => ({
                        ...prev,
                        name: e.target.value,
                    }))}
                    name="username" placeholder="Input Username" />
                <label> Categories </label>
                <select>
                    <option> select categories </option>
                    <option> Run </option>
                    <option> Bike </option>
                    <option> Lift </option>
                    <option> Swim </option>
                    <option> Sports </option>

                </select>
                {/* <input name="categories" placeholder="Select Categories" /> */}
                <label> Duration </label>
                <input type="number" name="duration" placeholder="" />

                <label> Intensity </label>
                <input type="number" name="intensity" placeholder="" />
            </form>
                    <button className="buttonsave" onClick={handleSubmit}> Save </button>
                </>
            ) : (<p className='logter'>login to view</p>)}


        </div>
    )
}

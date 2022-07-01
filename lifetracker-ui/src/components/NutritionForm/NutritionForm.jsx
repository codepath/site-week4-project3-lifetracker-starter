import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect,  } from 'react';
import apiClient from "../../services/apiClient";
import {Routes, Route, useNavigate} from 'react-router-dom';
import NutritionOverview from "components/NutritionOverview/NutritionOverview";
import "./NutritionForm.css";
import NotFound from "components/NotFound/NotFound";
import { NutritionContextProvider, useNutritionContext } from "../../contexts/nutrition";

export default function NutritionForm({}) {
    //state to check if user is logged in
    const {nutritions, setNutritions} = useNutritionContext();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        category: "",
        quantity: 1,
        calories: 0,
        imageUrl: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    //const {nutritions, setNutritions} = useNutritionContext();

    const handleOnInputChange = (event) => {
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
        const fetchNew = async () => {
            const {data, err} = await apiClient.newNutrition(form);

        }
        const fetchNutr = async () => {
            const {data, err} = await apiClient.fetchNutrition();
            if (data) setNutritions(data.nutritions);
            if (err) setErrors(err);
        }
        fetchNew();
        fetchNutr();
        navigate("/nutrition")
        console.log("nutritions after new", nutritions);
        
      }



    return (
        <div className="nutrition-form">
            <h2>Record Nutrition</h2>
            <div className="form">
                <div className="InputField">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Nutrition name" value={form.name} onChange={handleOnInputChange}/>
                </div>
                <div className="InputField">
                    <label >Category</label>
                    <select id="category" name="category" placeholder="Nutrition category" onChange={handleOnInputChange}>
                        <option value="beverage">Beverage</option>
                        <option value="snack">Snack</option>
                        <option value="fruitveggie">Fruit or Veggie</option>
                        <option value="dessert">Dessert</option>
                        <option value="maincourse">Main Course</option>
                    </select>
                </div>
                <div className="split-input-field">
                    <div className="InputField">
                        <label >Quantity</label>
                        <input type="number" name="quantity" min="1" max="100000000" value={form.quantity} onChange={handleOnInputChange}/>
                    </div>
                    <div className="InputField">
                        <label >Calories</label>
                        <input type="number" name="calories" min="0" max="10000000000" step="10" value={form.calories} onChange={handleOnInputChange}/>
                        </div>
                </div>
                <div className="InputField">
                    <label >Image URL</label>
                    <input type="text" name="imageUrl" placeholder="http://www.food-image.com/1" value={form.imageUrl} onChange={handleOnInputChange}/>
                </div>
                <button className="save-btn" onClick={handleOnSubmit}>Save</button>
            </div>
        </div>
    );
}
import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import "./NutritionCard.css";

export default function NutritionCard({nutrition = {}}) {
    //state to check if user is logged in
    return (
        <div className="nutrition-card">
            <div className="nutrition-name">{nutrition?.name}</div>
            <div>
                <img className="nutrition-image" src={nutrition?.imageUrl} alt="" />
            </div>
            <div className="nutrition-calories">{nutrition?.calories}</div>
            <div className="nutrition-category">{nutrition.category}</div>
            <div className="nutrition-date">{nutrition.createdAt}</div>
        </div>
    );
}
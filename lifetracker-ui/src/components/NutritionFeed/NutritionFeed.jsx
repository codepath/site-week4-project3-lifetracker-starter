import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import "./NutritionFeed.css";

export default function NutritionFeed({nutritions = []}) {
    //state to check if user is logged in
    return (
        <div className="nutrition-feed">
            {nutritions.length > 0 ? <h1>Nutrition Feed</h1> : <h1 className="empty-message">Nothing Here Yet</h1>}
        </div>
    );
}
import { NutritionContextProvider, useNutritionContext } from "../../contexts/nutrition";
import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import "./NutritionOverview.css";
import NotFound from "components/NotFound/NotFound";
import NutritionFeed from "components/NutritionFeed/NutritionFeed";

export default function OverviewContainer() {
    return (
      <NutritionContextProvider>
        <NutritionOverview/>
      </NutritionContextProvider>
    )
  }

function NutritionOverview({}) {
    const {nutritions, 
        setNutritions, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        
    } = useNutritionContext();

    return (
        <div className="nutrition-overview">
            <div className="overview-header">
                {Boolean(error.nutrition) && <span className="error">{error.nutrition}</span>}
                <h1>Overview</h1>
                <Link className="nutrition-btn" to="/nutrition/create">Record Nutrition</Link>
            </div>
            
            {isProcessing ? <h3>Loading</h3> : <NutritionFeed nutritions={[{id: 1, name: "chicken", calories: 1000, category: "meat", createdAt: "2-2-2022"}]}/>}
        </div>
    );
}
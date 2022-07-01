import { NutritionContextProvider, useNutritionContext } from "../../contexts/nutrition";
import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import "./NutritionOverview.css";
import NotFound from "components/NotFound/NotFound";

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
            {Boolean(error.nutrition) && <span className="error">{error.nutrition}</span>}
            <Link to="/nutrition/create">Record Nutrition</Link>
            {isProcessing ? <h3>Loading</h3> : <h2>NutritionFeed</h2>}
        </div>
    );
}
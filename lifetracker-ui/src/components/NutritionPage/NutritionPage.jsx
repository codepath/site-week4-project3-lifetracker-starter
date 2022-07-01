import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { NutritionContextProvider, useNutritionContext } from "../../contexts/nutrition";
import NutritionOverview from "components/NutritionOverview/NutritionOverview";
import NutritionForm from "components/NutritionForm/NutritionForm";
import "./NutritionPage.css";
import NotFound from "components/NotFound/NotFound";

export default function OverviewContainer() {
    return (
      <NutritionContextProvider>
        <NutritionPage/>
      </NutritionContextProvider>
    )
  }

function NutritionPage({}) {
    //state to check if user is logged in
    return (
        <div className="nutrition-page">
            <div className="nutrition-header">
            <h1>Nutrition</h1>
            </div>
            <Routes>
                <Route path="/" element={<NutritionOverview/>}/>
                <Route path="/create" element={<NutritionForm/>}/>
                <Route path="/id/:nutritionId" element={<h4>detail</h4>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}
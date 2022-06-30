import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import * as React from "react"

export default function NutritionPage(props) {

    return (
        <div className="nutrition-page">
            {props.isLoggedIn? <NutritionFeed /> : <AccessForbidden />}
        </div>
    )
}
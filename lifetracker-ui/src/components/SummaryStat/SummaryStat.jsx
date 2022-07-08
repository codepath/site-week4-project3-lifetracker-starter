import * as React from "react"
import "./SummaryStat.css"

export default function SummaryStat(props) {
    console.log(props)
    return (
        <div className="summary-stat">
            <p className="stat-label">{props.label}</p>
            <p className="primary-statistic">{props.stat}</p>
            <p className="secondary-statistic">{props.substat}</p>
        </div>
    )}
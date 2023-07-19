import React, { useState, useEffect } from "react";
import "../Titles/Titles.css";

const Titles = () => {
  return (
    <div className="tiles">
      <div className="tile">
        <p className="tile-title">Fitness</p>
        <div className="tile-image">
          <img src="https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
        </div>
      </div>
      <div className="tile">
        <p className="tile-title">Food</p>
        <div className="tile-image">
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
        </div>
      </div>
      <div className="tile">
        <p className="tile-title">Rest</p>
        <div className="tile-image">
          <img src="https://images.unsplash.com/photo-1568617935424-49ab968826d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
        </div>
      </div>
      <div className="tile">
        <p className="tile-title">Planner</p>
        <div className="tile-image">
          <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
        </div>
      </div>
    </div>
  );
};

export default Titles;

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "components/Navbar/Navbar";

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="/activity"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="/nutrition/*"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

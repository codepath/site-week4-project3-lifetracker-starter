import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import LoginForm from "components/LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage({loggedIn}) {
    //state to check if user is logged in
    return (
        <div className="login-page">
            <LoginForm></LoginForm>
        </div>
    );
}
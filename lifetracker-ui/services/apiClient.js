import axios from "axios"
// const { API_BASE_URL } = require("../constants")
API_BASE_URL = "http://localhost:3001"

export default class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token
    }

    // isLoggedIn() {
    //     return this.token !== null
    // }
    request(endpoint, information) {
        const user = null;
        if (endpoint === "login")
        {
            axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM login", response)
                localStorage.setItem("lifetracker_token", response.data.token)
              
                }, reason => {
                setError(reason);
                console.error(error);
                })
        }
        else if (endpoint === "register")
        {
            axios.post(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM register", response)
                this.login({"email": response.data.user.email, "password": response.data.user.password})
                }, reason => {
                setError(reason);
                console.error(error);
                })
        }
        else if (endpoint === "me")
        {
            axios.get(`${API_BASE_URL}/auth/${endpoint}`,
                information, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${information}`
                    }
                })
                .then((response) => {
                console.log("RESPONSE FROM register", response)
                user = response.data.user
                }, reason => {
                setError(reason);
                console.error(error);
                })
        }
        return user
    }

    login(user) {
        // user have keys called email and password
        this.request("login", user)
    }

    signup(user) {
        // user have keys called email, password, username, fname, lname
        this.request("register", user)
    }

    fetchUserFromToken() {
        // token is stored inside of this.token
        this.request("me", this.token)
    }

}


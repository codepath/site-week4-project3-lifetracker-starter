import axios from "axios"
const { API_BASE_URL } = require("../constants")

class ApiClient {
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
        pass
        // axios.post(
        //     `API_BASE_URL/auth/${endpoint}`,
        //     information
        // )
    }

    login(user) {
        // user have keys called email and password
        this.request("login", {})
    }

    signup(user) {
        // user have keys called email and password
        this.request("register", user)
    }

    fetchUserFromToken() {
        // token is stored inside of this.token
        this.request("me", this.token)
    }

}

module.exports = ApiClient
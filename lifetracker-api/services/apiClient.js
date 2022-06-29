import axios from "axios"
import { API_BASE_URL } from "../constants"

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token
    }

    static request(type, requestBody, endpoint) {
        // type: either "get" or "post"
        // requestBody
        // endpoint: ex. "/auth/login"
        // do axios request stuff here
    }

    login() {
        // call request method to send http request to auth/login endpoint
        this.request("POST", {}, "/auth/login")
    }

    signup() {
        // call request method to send http request to auth/register endpoint
    }

    fetchUserFromToken() {
        // call request method to send http request to the auth/me endpoint
    }

    // add more methods here as needed for making api requests

}

module.exports = new ApiClient(API_BASE_URL)
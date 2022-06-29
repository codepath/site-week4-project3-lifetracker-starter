import axios from "axios"
import { API_BASE_URL } from "../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    static async setToken(token) {
        this.token = token
    }

    request(type, requestBody, endpoint) {
        // need a HTTP request type and an api endpoint
        // as well as any contents to post
        axios.type(endpoint, requestBody)
    }

    login() {
        this.request(post, {}, "/auth/login")
    }

    signup() {
        this.request(post, {}, "/auth/register")
    }

    fetchUserFromToken() {
        this.request(post, {}, "/auth/me")
    }



}


module.export = new ApiClient(API_BASE_URL)



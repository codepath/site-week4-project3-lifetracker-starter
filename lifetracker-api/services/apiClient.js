const axios = require("axios")
const { API_BASE_URL } = require("../constants")

class ApiClient{

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }

    static setToken(token) {
        this.token = token;
    }

    static async request(url) {
        const response = await axios.get("");
    }

    static async login(url) {
        const login = await ApiClient.request();
        return login;
    }
    
    static async signup() {
        const newUser = await ApiClient.request();
        return newUser;
    }

    static async fetchUserFromToken(token){
        
    }
}

module.exports = ApiClient
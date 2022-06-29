import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    setToken(token) {
        this.token = token   
    }

    async request({ endpoint, method = `GET`, data = {}}) {
        const url = `${this.remoeHostUrl}/${endpoint}`
        
        const headers = {
            "Content-type": "application/json"
        }

        if (this.token){
            headedrs["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({url, method, data, headers })
        } catch(err){

        }

    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")
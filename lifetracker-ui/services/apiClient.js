import axios from "axios"

export class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl || "http://localhost:3005"
        this.token = null
        this.token = "lifetracker_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = 'GET', data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json",
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return({data: res.data, error: null})

        } catch(error) {
            console.error(error.response)
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }
    }


  

  async fetchUserFromToken() {
    return await this.request({ endpoint: 'auth/me', method: 'GET' });
  }

  async loginUser(cred){
    return await this.request({endpoint: `auth/login`, method: 'POST', data: cred})
  }

  async signupUser(cred){
    return await this.request({endpoint: `auth/register`, method: 'POST', data: cred})
  }

  async addExercise(cred){
    return await this.request ({endpoint: 'exercise/', method: 'POST', data: cred})
  }

  async listExercises(cred){
    console.log("cred",cred)
    return await this.request ({endpoint: 'exercise/list', method:'POST', data:cred })
    
  }

 
 
  
  
}



export default new ApiClient
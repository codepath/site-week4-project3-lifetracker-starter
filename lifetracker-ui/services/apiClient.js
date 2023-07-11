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
    return await this.request ({endpoint: 'exercise/', method:'GET', data:cred })
  }

  async addEx(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addEx', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Exercise added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add exercise:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the exercise.' };
    }
  }
  

  async addN(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addN', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Nutrition added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add nutrtion:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the nutrition.' };
    }
  }

  
  async addS(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addS', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Sleep added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add sleep:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the sleep.' };
    }
  }

  async getExercises() {
    console.log("entered the excercises")
    return await this.request({ endpoint: 'auth/exercises', method: 'GET' });
  }

  async getNutrition() {
    console.log("grabbing the nutritions")
    return await this.request({ endpoint: 'auth/nutritions', method: 'GET' });
  }

  async getSleep() {
    return await this.request({ endpoint: 'auth/sleeps', method: 'GET' });
  }

  async getMaxSleep() {
    return await this.request({ endpoint: 'auth/maxsleep', method: 'GET' });
  }

  async getAvgCal() {
    return await this.request({ endpoint: 'auth/avgcal', method: 'GET' });
  }

  async getTotalE() {
    return await this.request({ endpoint: 'auth/totalE', method: 'GET' });
  }
  
  
}



export default new ApiClient
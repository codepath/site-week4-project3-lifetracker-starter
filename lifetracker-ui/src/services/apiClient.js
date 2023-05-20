import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    this.token = null
    this.remoteHostUrl = remoteHostUrl || "http://localhost:3001"
  }

  setToken(token) {
    this.token = token
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`
    console.debug("API Call:", endpoint, data, method)
    const params = method === "get" ? data : {}
    const headers = {
      "Content-Type": "application/json",
    }
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    try {
      const res = await axios({ url, method, data, params, headers })
      return { data: res.data, error: null, message: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response)
      if (error?.response?.status === 404) return { data: null, error: "Not found" }
      const message = error?.response?.data?.error?.message
      return { data: null, error: error?.response, message }
    }
  }

  async createNutrition(nutrition) {
    return await this.request({ endpoint: `nutrition`, method: `POST`, data: { nutrition } })
  }

  async createExercise(exercise) {
    return await this.request({ endpoint: `exercise`, method: `POST`, data: { exercise } })
  }

  async createSleep(sleep) {
    return await this.request({ endpoint: `sleep`, method: `POST`, data: { sleep } })
  }

  async fetchUser() {
    return await this.request({ endpoint: `users/me`, method: `GET` })
  }

  async register(creds) {
    return await this.request({ endpoint: `auth/register`, method: `POST`, data: creds })
  }

  async login(creds) {
    return await this.request({ endpoint: `auth/token`, method: `POST`, data: creds })
  }
}

export default new ApiClient(import.meta.env.VITE_REMOTE_HOST_URL)

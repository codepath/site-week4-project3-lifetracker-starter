import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.token = null;
    this.remoteHostUrl = "https://life-tracker-backend-56nt.onrender.com";
    // this.remoteHostUrl = "http://localhost:3001"
  }

  setToken(token) {
    this.token = token;
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    console.debug("API Call:", endpoint, data, method);
    const params = method === "GET" ? data : {};
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, params, headers });
      return { data: res.data, error: null, message: null };
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response);
      if (error?.response?.status === 404)
        return { data: null, error: "Not found" };
      const message = error?.response?.data?.error?.message;
      return { data: null, error: error?.response, message };
    }
  }

  async register(creds) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: creds,
    });
  }
  async nutrition(creds) {
    return await this.request({
      endpoint: `auth/nutrition`,
      method: `POST`,
      data: creds,
    });
  }

  async me(creds) {
    return await this.request({
      endpoint: `auth/me`,
      method: `GET`,
      data: creds,
    });
  }

  async exercise(creds) {
    return await this.request({
      endpoint: `auth/exercise`,
      method: `POST`,
      data: creds,
    });
  }
  async sleep(creds) {
    return await this.request({
      endpoint: `auth/sleep`,
      method: `POST`,
      data: creds,
    });
  }
  async login(creds) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: creds,
    });
  }
  async stats(creds) {
    return await this.request({
      endpoint: `auth/summarystats`,
      method: `POST`,
      data: creds,
    });
  }
}

export default new ApiClient("https://life-tracker-backend-56nt.onrender.com");

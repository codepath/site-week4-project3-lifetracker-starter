

//defines a new class
class ApiClient{
    constructor(remoteHostUrl){ //constructor function
        this.remoteHostUrl = remoteHostUrl
        this.token = null

    }
}


/*
async request({endpoint, method = "GET", data = {}}) {
    const url 
    try{
        const res = await axios({url, method, data, headers})
        console.log(res)
        return {data: res.data, error: null}
    }catch(error){
        console.error({errorResponse: error.response})
        const message = error?.response?.data?.error?.message
        console.log(message)
        return {data: null, error: message}
    }
*/



export default new ApiClient
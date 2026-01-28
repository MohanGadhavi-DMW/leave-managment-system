import axios from "axios";

const publicRequest = axios.create({
    baseURL: 'http://partnerapi.quest2travel.org:8030',
    timeout: 20000,
});

publicRequest.interceptors.request.use(function(config){
    return config
},function (error){
    return  Promise.reject(error)
})
publicRequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response', response)
    if(response.status === 401){
        sessionStorage.clear()
        window.location.assign("/")
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error('error', error)
    if(error.response?.status === 401){
        sessionStorage.clear()
        window.location.assign("/") 
    }
    return Promise.reject(error);
  });

export default publicRequest
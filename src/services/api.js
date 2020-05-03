import axios from 'axios'

const api = axios.create({
    //baseURL:'http://localhost:3001/api/'
    baseURL:`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/api/`
})

export default api;
import axios from 'axios'
import store from '../store/index'
import { userActions } from '../store/actions';

const token = localStorage.getItem('token'); 

let API = axios.create({
    baseURL: 'https://pitchr-backend.herokuapp.com/',    
    headers: {  
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;


API.interceptors.response.use(
    res => {
        return res
    },
    err => {
        if (err.response.status) {
             if (err.response.data.error.name === 'TokenExpiredError') {
              console.log("nu den gal")
                store.dispatch(userActions.logout())
                throw err
            }
            throw err.response.data
        }
        if (typeof err?.response?.data?.error.name !== 'undefined') {
          
    }
 }
)




export default API